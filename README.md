# Web API et système de recommandations

Un système de recommandations de films.


- [Web API et système de recommandations](#web-api-et-système-de-recommandations)
  - [Spécifications](#spécifications)
  - [Ressources](#ressources)
  - [Modèles](#modèles)
  - [Représentations acceptées par le client](#représentations-acceptées-par-le-client)
  - [Représentations mises à disposition des clients](#représentations-mises-à-disposition-des-clients)
    - [Mes recommandations](#mes-recommandations)
    - [Noter un film](#noter-un-film)
  - [Lancer le projet](#lancer-le-projet)


## Spécifications

- Le système doit permettre de consulter un catalogue de films ;
- L'utilisateur peut noter un film de 0 à 5, 5 étant la meilleure note ;
- Le système doit recommander à chaque utilisateur une liste de films *susceptible de lui plaire*.
- Un utilisateur est identifié par un numéro unique


## Ressources


| Label                 | URL                   | Méthodes HTTP | Commentaires |
| --------------------- | --------------------- | ------------- | ------------ |
| Le catalogue de films | `/movies`             | GET           |              |
| Le détail d'un film   | `/movies/{id}`        | GET           |              |
| Noter un film         | `/movies/{id}/review` | POST          |              |
| Mes recommandations   | `/recos`              | QUERY         |              |


## Modèles

- Movie : id_movie, title
- User : id_user, name
- Review : id_user, id_movie, rating

## Représentations acceptées par le client

## Représentations mises à disposition des clients

### Mes recommandations

~~~
QUERY /recos

idUser
~~~

### Noter un film

~~~
POST /movies/1234/review

idUser
rating
~~~


## Lancer le projet

~~~bash
npm i
~~~
