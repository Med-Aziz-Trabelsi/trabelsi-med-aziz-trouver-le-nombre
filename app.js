// Version 3.0 — Ajout d'indices (plus grand / plus petit)

const input = document.getElementById("num-saisie");
const bouton = document.getElementById("submit-btn");
const message = document.getElementById("message");
const niveauSelect = document.getElementById("niveau");
const indiceBtn = document.getElementById("indice-btn");
const indiceMessage = document.getElementById("indice-message");

let nombreMystere;
let essaisRestants;
let max;
let dernierInput = null; // pour stocker la dernière saisie

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
  indiceMessage.textContent = ""; // reinitialize message d'indice
  dernierInput = null;
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
    message.textContent = "Bravo ! Vous avez deviné le bon nombre.";
    message.style.color = "lime";
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
}
// Nouvelle fonction pour donner un indice
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

// evenements
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

// initialiser le jeu au chargement
initialiserJeu();
