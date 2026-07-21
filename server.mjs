/**
 * Application
 */

import express from "express";
import { movies, users, reviews } from "./database.mjs";

const app = express();

//Décoder le body au format application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = 3000;

/**
 * Retourne une représentation hypermédia (au format pseudo HAL) d'un film
 */
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

  const movie = movies.find((m) => m.id === Number.parseInt(req.params.id));

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
    globalReview: "Note moyenne des utilisateurs (à implémenter)",
  };
  return res.status(200).json(representation);
});

app.post("/movies/:id/review", (req, res) => {
  const movieToReview = movies.find(
    (m) => m.id === Number.parseInt(req.params.id),
  );

  if (!movieToReview) {
    return res.status(404).json({ error: "Unkown movie" });
  }

  //Validation de la note (fournie et valeur correcte)
  const rating = Number.parseInt(req.body.rating);

  if (!Number.isInteger(rating) || ![0, 1, 2, 3, 4, 5].includes(rating)) {
    return res
      .status(404)
      .json({ error: "Rating must be an integer between 0 and 5 (included)" });
  }

  //Validation de l'identifiant utilisateur (fourni et existe)
  const userId = Number.parseInt(req.body.userId);

  if (!userId) {
    return res
      .status(400)
      .json({ error: "userId must be send to review the movie" });
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(400).json({ error: "user does not exist" });
  }

  //Review the movies
  const currentReview = reviews.find(
    (r) => r.userId === userId && r.movieId === movieToReview.id,
  );

  if (!currentReview) {
    reviews.push({
      userId: userId,
      movieId: movieToReview.id,
      rating: rating,
    });
  } else {
    currentReview.rating = rating;
  }

  console.log(reviews);

  // A faire : retourner une représentation hypermédia
  return res
    .status(201)
    .json({ review: `You gave ${rating} to the movie ${movieToReview.titre}` });
});

app.use("/recos", (req, res) => {
  //A implémenter avec QUERY
});

app.listen(port, () => {
  console.log(`Système de recommandation de films écoute sur le port ${port}`);
});
