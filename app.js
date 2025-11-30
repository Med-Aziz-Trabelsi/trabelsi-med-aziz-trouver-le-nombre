// Version 2.0 — Ajout du menu de difficulté

const input = document.getElementById("num-saisie");
const bouton = document.getElementById("submit-btn");
const message = document.getElementById("message");
const niveauSelect = document.getElementById("niveau");

let nombreMystere;
let essaisRestants;
let max;

// Fonction pour initialiser le jeu selon la difficulté
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
}

// Vérifie la saisie
function verifierNombre() {
  const valeur = parseInt(input.value);

  if (isNaN(valeur) || valeur < 1 || valeur > max) {
    message.textContent = `Entrez un nombre entre 1 et ${max}.`;
    message.style.color = "orange";
    return;
  }

  essaisRestants--;

  if (valeur === nombreMystere) {
    message.textContent = "Bravo ! Vous avez deviné le bon nombre.";
    message.style.color = "lime";
    bouton.disabled = true;
    input.disabled = true;
  } else if (essaisRestants > 0) {
    message.textContent = `Mauvais nombre. Il vous reste ${essaisRestants} essai(s).`;
    message.style.color = "red";
  } else {
    message.textContent = `Partie terminée ! Le nombre était ${nombreMystere}.`;
    message.style.color = "gray";
    bouton.disabled = true;
    input.disabled = true;
  }
}

// Événements
bouton.addEventListener("click", verifierNombre);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") verifierNombre();
});
niveauSelect.addEventListener("change", () => {
  bouton.disabled = false;
  input.disabled = false;
  initialiserJeu();
});

// Lancement initial
initialiserJeu