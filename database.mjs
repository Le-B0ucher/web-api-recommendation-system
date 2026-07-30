/**
 * Base de test.
 */

const users = [
  { id: 1, name: "John Doe" },      // Utilisateur cible du test
  { id: 2, name: "Jane Doe" },      // Profil JUMEAU de John
  { id: 3, name: "Bob Smith" },     // Profil OPPOSÉ à John
  { id: 4, name: "Alice Martin" },  // Profil TRÈS PROCHE de John
  { id: 5, name: "Charlie Brown" }, // Profil Neutre / Moyen
  { id: 6, name: "Eva Dupont" },
  { id: 7, name: "Frank Miller" },
  { id: 8, name: "Grace Hopper" },
  { id: 9, name: "Heidi Weiss" },
  { id: 10, name: "Ivan Rossi" },
  { id: 11, name: "Judy Garland" },
  { id: 12, name: "Karl Marx" },
];

const movies = [
  { id: 1, titre: "Inception" },
  { id: 2, titre: "Le Parrain" },
  { id: 3, titre: "Pulp Fiction" },
  { id: 4, titre: "Interstellar" },
  { id: 5, titre: "Forrest Gump" },
  { id: 6, titre: "Matrix" },
  { id: 7, titre: "Le Seigneur des Anneaux :la Communauté de l'anneau" },
  { id: 8, titre: "La Ligne Verte" },
  { id: 9, titre: "Fight Club" },
  { id: 10, titre: "Gladiator" },
  { id: 11, titre: "Les Évadés" },
  { id: 12, titre: "Le Fabuleux destin d'Amélie Poulain" },
  { id: 13, titre: "Parasite" },
  { id: 14, titre: "The Dark Knight : le Chevalier Noir" },
  { id: 15, titre: "Le Voyage de Chihiro" },
  { id: 16, titre: "Back to the Future" },
  { id: 17, titre: "Intouchables" },
  { id: 18, titre: "La Liste de Schindler" },
  { id: 19, titre: "Le silence des Agneaux" },
  { id: 20, titre: "Star Wars : Épisode IV - Un Nouvel Espoir" },
];


const reviews = [
  // --- John Doe (userId: 1) --- Profil de référence
  { userId: 1, movieId: 1, rating: 5 },
  { userId: 1, movieId: 4, rating: 5 },
  { userId: 1, movieId: 6, rating: 4 },

  // --- Jane Doe (userId: 2) --- Profil JUMEAU
  { userId: 2, movieId: 1, rating: 5 },
  { userId: 2, movieId: 4, rating: 5 },
  { userId: 2, movieId: 6, rating: 4 },
  { userId: 2, movieId: 14, rating: 5 },

  // --- Bob Smith (userId: 3) --- Profil OPPOSÉ
  { userId: 3, movieId: 1, rating: 1 },
  { userId: 3, movieId: 4, rating: 1 },
  { userId: 3, movieId: 6, rating: 1 },
  { userId: 3, movieId: 3, rating: 5 },

  // --- Alice Martin (userId: 4) --- Profil PROCHE
  { userId: 4, movieId: 1, rating: 5 },
  { userId: 4, movieId: 4, rating: 4 },
  { userId: 4, movieId: 5, rating: 5 },

  // --- Charlie Brown (userId: 5) --- Profil Neutre
  { userId: 5, movieId: 2, rating: 3 },
  { userId: 5, movieId: 3, rating: 4 },
  { userId: 5, movieId: 5, rating: 2 },

  // --- Eva Dupont (userId: 6) ---
  { userId: 6, movieId: 11, rating: 5 },
  { userId: 6, movieId: 12, rating: 4 },
  { userId: 6, movieId: 1, rating: 2 },

  // --- Frank Miller (userId: 7) ---
  { userId: 7, movieId: 9, rating: 5 },
  { userId: 7, movieId: 10, rating: 5 },
  { userId: 7, movieId: 14, rating: 4 },

  // --- Grace Hopper (userId: 8) ---
  { userId: 8, movieId: 15, rating: 5 },
  { userId: 8, movieId: 16, rating: 4 },

  // --- Heidi Weiss (userId: 9) ---
  { userId: 9, movieId: 4, rating: 5 },
  { userId: 9, movieId: 7, rating: 5 },
  { userId: 9, movieId: 14, rating: 5 },

  // --- Ivan Rossi (userId: 10) ---
  { userId: 10, movieId: 17, rating: 4 },
  { userId: 10, movieId: 18, rating: 5 },

  // --- Judy Garland (userId: 11) ---
  { userId: 11, movieId: 8, rating: 5 },
  { userId: 11, movieId: 19, rating: 4 },

  // --- Karl Marx (userId: 12) ---
  { userId: 12, movieId: 13, rating: 5 },
  { userId: 12, movieId: 20, rating: 3 },
];

export { movies, users, reviews };