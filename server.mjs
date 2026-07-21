/**
 * Application
 */

import express from "express";
import { movies } from "./database.mjs";

const app = express();
const port = 3000;

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
  res.status(200).json(representation);
});

app.get("/movies", (req, res) => {
  //A implémenter.
});

app.get("/movies/:id", (req, res) => {
  //A implémenter.
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
