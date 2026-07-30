# Web API et système de recommandations de films

API Node.js/Express de recommandation de films basée sur la similarité entre profils utilisateurs (distance euclidienne).

## Lancer le projet

```bash
npm install
npm run dev
```

L'API écoute sur `http://localhost:3000`.

## Ressources / Endpoints

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/` | Point d'entrée (liens HAL) |
| GET | `/movies` | Catalogue des films, avec note moyenne (`globalReview`) |
| GET | `/movies/top` | Les 10 films les mieux notés |
| GET | `/movies/:id` | Détail d'un film, avec sa note moyenne |
| GET | `/recos?userId=1` | Recommandations pour un utilisateur |

### Exemples cURL

```bash
curl http://localhost:3000/movies
curl http://localhost:3000/movies/top
curl "http://localhost:3000/recos?userId=1"
```

## Documentation

### Modèles de données

- **User** : `id`, `name`
- **Movie** : `id`, `titre`
- **Review** : `userId`, `movieId`, `rating` (note de 0 à 5)

Les données sont en mémoire dans `database.mjs`.

### Module de recommandations (`recommandations.mjs`)

- `distance(reviewsA, reviewsB)` : distance euclidienne entre deux séries de notes.
- `similarity(userA, userB)` : coefficient de similarité (entre 0 et 1) basé sur la distance. On exige au moins 2 films en commun pour une comparaison fiable.
- `makeRecommandations(user, nbRecos = 3)` : liste des films recommandés, triés par score décroissant.

### Algorithme

Pour chaque profil suffisamment similaire à l'utilisateur (similarité ≥ 0,5), on cumule les notes des films qu'il n'a pas encore vus, pondérées par la similarité, puis on normalise. Les films au meilleur score sont recommandés.

## Choix techniques

- **`GET /recos?userId=1`** (query parameter) est utilisé à la place de la méthode `QUERY`, encore expérimentale et peu supportée par Express 5.
- La route `/movies/top` est déclarée **avant** `/movies/:id` pour éviter que « top » soit interprété comme un identifiant.

## Commentaires

Test de validation : `makeRecommandations(1)` (John Doe) privilégie bien **The Dark Knight** et **Forrest Gump**, portés respectivement par Jane (profil jumeau) et Alice (profil proche). Ces deux films ressortent à égalité de score car chacun n'est recommandé que par un seul profil proche ; en cas d'égalité, l'ordre dépend du tri.