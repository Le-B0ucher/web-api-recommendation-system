import { users, reviews } from "./database.mjs";


function moyenne(serie) {
    let somme = 0;
    for (let i = 0; i < serie.length; i++) {
        somme = somme + serie[i];
    }
    return somme / serie.length;
}


function distance(reviewsA, reviewsB) {
    const carresDesEcarts = reviewsA.map((valeur, i) => (valeur - reviewsB[i]) ** 2);
    let somme = 0;
    for (let i = 0; i < carresDesEcarts.length; i++) {
        somme = somme + carresDesEcarts[i];
    }
    return Math.sqrt(somme);
}


function notesDe(idUser) {
    const notes = {};
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].userId === idUser) {
            notes[reviews[i].movieId] = reviews[i].rating;
        }
    }
    return notes;
}


function similarity(userA, userB) {
    const notesA = notesDe(userA);
    const notesB = notesDe(userB);

    const notesCommunesA = [];
    const notesCommunesB = [];

    for (const idFilm in notesA) {
        if (notesB.hasOwnProperty(idFilm)) {
            notesCommunesA.push(notesA[idFilm]);
            notesCommunesB.push(notesB[idFilm]);
        }
    }

    // Au moins 2 films communs
    if (notesCommunesA.length < 2) {
        return 0;
    }

    const d = distance(notesCommunesA, notesCommunesB);
    return 1 / (1 + d);
}


function makeRecommandations(user, nbRecos = 3) {
    const mesNotes = notesDe(user);

    const scores = {};
    const normalisation = {};

    for (let i = 0; i < users.length; i++) {
        const autre = users[i].id;

        if (autre === user) continue;

        const s = similarity(user, autre);

        if (s < 0.5) continue;

        const notesAutre = notesDe(autre);

        for (const idFilm in notesAutre) {
            if (!mesNotes.hasOwnProperty(idFilm)) {
                if (!scores.hasOwnProperty(idFilm)) {
                    scores[idFilm] = 0;
                    normalisation[idFilm] = 0;
                }
                scores[idFilm] += notesAutre[idFilm] * s;
                normalisation[idFilm] += s;
            }
        }
    }

    const recommandations = [];
    for (const idFilm in scores) {
        recommandations.push({
            movieId: Number.parseInt(idFilm),
            score: scores[idFilm] / normalisation[idFilm],
        });
    }

    recommandations.sort((a, b) => b.score - a.score);

    return recommandations.slice(0, nbRecos);
}

export { distance, similarity, makeRecommandations };
