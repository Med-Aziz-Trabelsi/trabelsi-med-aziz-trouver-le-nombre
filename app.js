// Version 4.0 — Ajout du système de score et sauvegarde du meilleur score

const input = document.getElementById("num-saisie");
const bouton = document.getElementById("submit-btn");
const message = document.getElementById("message");
const niveauSelect = document.getElementById("niveau");
const indiceBtn = document.getElementById("indice-btn");
const indiceMessage = document.getElementById("indice-message");
const scoreDisplay = document.getElementById("score");        //  affichage du score
const bestScoreDisplay = document.getElementById("best-score"); // affichage du meilleur score

let nombreMystere;
let essaisRestants;
let max;
let dernierInput = null; // pour stocker la dernière saisie
let score = 0;           // score actuel
let bestScore = localStorage.getItem("bestScore") || 0; // meilleur score sauvegardé

function initialiserJeu() {
  const niveau = niveauSelect.value;

  if (niveau === "facile") {
    max = 10;
    essaisRestants = 5;
  } else if (niveau === "moyen") {
    max = 100;
    essaisRestants = 3;
  } else {
    max = 1000;
    essaisRestants = 1;
  }

  nombreMystere = Math.floor(Math.random() * max) + 1;
  message.textContent = `Le jeu commence ! Vous avez ${essaisRestants} essai(s).`;
  message.style.color = "white";
  input.value = "";
  indiceMessage.textContent = ""; // réinitialiser le message d'indice
  dernierInput = null;
  score = 0; // réinitialiser le score
  scoreDisplay.textContent = `Score actuel : ${score}`;
  bestScoreDisplay.textContent = `Meilleur score : ${bestScore}`;
}

function verifierNombre() {
  const valeur = parseInt(input.value);

  if (isNaN(valeur) || valeur < 1 || valeur > max) {
    message.textContent = `Entrez un nombre entre 1 et ${max}.`;
    message.style.color = "orange";
    return;
  }

  dernierInput = valeur; // sauvegarder la dernière tentative
  essaisRestants--;

  if (valeur === nombreMystere) {
    // calcul du score : basé sur essais restants
    score = essaisRestants + 1;
    message.textContent = `Bravo ! Vous avez deviné le bon nombre. Score : ${score}`;
    message.style.color = "lime";

    // mise à jour du meilleur score
    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem("bestScore", bestScore);
      bestScoreDisplay.textContent = `Meilleur score : ${bestScore}`;
    }

    bouton.disabled = true;
    input.disabled = true;
    indiceBtn.disabled = true;
  } else if (essaisRestants > 0) {
    message.textContent = `Mauvais nombre. Il vous reste ${essaisRestants} essai(s).`;
    message.style.color = "red";
  } else {
    message.textContent = `Partie terminée ! Le nombre était ${nombreMystere}.`;
    message.style.color = "gray";
    bouton.disabled = true;
    input.disabled = true;
    indiceBtn.disabled = true;
  }

  scoreDisplay.textContent = `Score actuel : ${score}`;
}

// fonction pour donner un indice
function donnerIndice() {
  if (dernierInput === null) {
    indiceMessage.textContent = "Faites une première tentative avant de demander un indice.";
    indiceMessage.style.color = "orange";
    return;
  }

  if (dernierInput < nombreMystere) {
    indiceMessage.textContent = "Indice : Le nombre mystère est PLUS GRAND.";
    indiceMessage.style.color = "aqua";
  } else if (dernierInput > nombreMystere) {
    indiceMessage.textContent = "Indice : Le nombre mystère est PLUS PETIT.";
    indiceMessage.style.color = "aqua";
  }
}

// événements
bouton.addEventListener("click", verifierNombre);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") verifierNombre();
});
niveauSelect.addEventListener("change", () => {
  bouton.disabled = false;
  input.disabled = false;
  indiceBtn.disabled = false;
  initialiserJeu();
});
indiceBtn.addEventListener("click", donnerIndice);

const resetBtn = document.getElementById("reset-score-btn");

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("bestScore");
  bestScore = 0;
  bestScoreDisplay.textContent = `Meilleur score : ${bestScore}`;
  alert("Le meilleur score a été réinitialisé !");
});

// initialiser le jeu au chargement
initialiserJeu();
