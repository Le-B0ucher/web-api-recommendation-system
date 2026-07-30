import express from "express";
import { movies, users, reviews } from "./database.mjs";
import { makeRecommandations } from "./recommandations.mjs";

const app = express();
const port = 3000;


function noteMoyenneFilm(movieId) {
  const notes = reviews.filter(r => r.movieId === movieId).map(r => r.rating);
  if (notes.length === 0) return null;
  const somme = notes.reduce((acc, n) => acc + n, 0);
  return somme / notes.length;
}

function mapMovieToResource(movie) {
  return {
    _links: {
      self: { href: `/movies/${movie.id}` },
    },
    title: movie.titre,
    globalReview: noteMoyenneFilm(movie.id),
  };
}

app.get("/", (req, res) => {
  //Spéficiation 'HAL'
  //@See https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-08#section-4.1.1
  const representation = {
    _links: {
      self: { href: "/" },
      movies: { href: "/movies" },
      recos: { href: "/recos" },
      topMovies: { href: "/movies/top" },
    },
    description:
      "Un système de recommandations de films. Parcourez le catalogue, notez les films en fonction de vos goûts et recevez des recommandations personalisées",
  };
  return res.status(200).json(representation);
});

app.get("/movies", (req, res) => {
  const representation = {
    _links: {
      self: { href: "/movies" },
      recos: { href: "/recos" },
      topMovies: { href: "/movies/top" },
    },
    movies: movies.map(mapMovieToResource),
  };
  return res.status(200).json(representation);
});


app.get("/movies/top", (req, res) => {
  const classement = movies
    .map(movie => ({
      title: movie.titre,
      globalReview: noteMoyenneFilm(movie.id),
      _links: { self: { href: `/movies/${movie.id}` } },
    }))
    .filter(m => m.globalReview !== null) // on écarte les films sans note
    .sort((a, b) => b.globalReview - a.globalReview)
    .slice(0, 10);

  const representation = {
    _links: {
      self: { href: "/movies/top" },
      movies: { href: "/movies" },
    },
    topMovies: classement,
  };
  return res.status(200).json(representation);
});

app.get("/movies/:id", (req, res, next) => {
  if (!/^(\d+)$/.test(req.params.id)) {
    return res.status(400).json({ error: "Bad request" });
  }

  const movie = movies.find(m => m.id === Number.parseInt(req.params.id));

  if (!movie) {
    return res.status(404).json({ error: "Unkown movie" });
  }

  const representation = {
    _links: {
      self: { href: `/movies/${req.params.id}` },
      movies: { href: "/movies" },
      recos: { href: "/recos" },
    },
    title: movie.titre,
    globalReview: noteMoyenneFilm(movie.id),
  };
  return res.status(200).json(representation);
});

app.post("/movies/:id/review", (req, res) => {
  //A implémenter.
});

app.get("/recos", (req, res) => {

  const userId = Number.parseInt(req.query.userId);

  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: "userId manquant ou invalide" });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "Utilisateur inconnu" });
  }

  const recommandations = makeRecommandations(userId);

  const representation = {
    _links: {
      self: { href: `/recos?userId=${userId}` },
      movies: { href: "/movies" },
    },
    user: user.name,
    recommandations: recommandations,
  };
  return res.status(200).json(representation);
});

app.listen(port, () => {
  console.log(`Système de recommandation de films écoute sur le port ${port}`);
});