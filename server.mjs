/**
 * Application
 */

import express from "express";
import { movies } from "./database.mjs";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenue !");
});

app.get('/movies', (req, res) => {
//A implémenter.
});

app.get('/movies/:id', (req, res) => {
//A implémenter.
});

app.post('/movies/:id/review', (req, res) => {
//A implémenter.
});

app.use('/recos', (req, res) => {
//A implémenter avec QUERY
});

app.listen(port, () => {
  console.log(`Système de recommandation de films écoute sur le port ${port}`);
});
