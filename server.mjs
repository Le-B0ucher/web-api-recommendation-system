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

app.listen(port, () => {
  console.log(`Système de recommandation de films écoute sur le port ${port}`);
});
