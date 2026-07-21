/**
 * Application
 */

import express from "express";
import { movies } from "./database.mjs";

const app = express();
const port = 3000;

function mapMovieToResource(movie) {
  return {
    _links: {
      self: `/movie/${movie.id}`,
    },
    title: movie.titre,
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
    },
    movies: movies.map(mapMovieToResource),
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
    rating: "Note moyenne des utilisateurs (à implémenter)",
  };
  return res.status(200).json(representation);
});

app.post("/movies/:id/review", (req, res) => {
  //A implémenter.
});

app.use("/recos", (req, res) => {
  //A implémenter avec QUERY
});

app.listen(port, () => {
  console.log(`Système de recommandation de films écoute sur le port ${port}`);
});
