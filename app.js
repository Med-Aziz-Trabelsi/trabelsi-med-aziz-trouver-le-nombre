//Version 1.0 — Jeu de devine le nombre
// Génère un nombre aléatoire entre 1 et 10
const nombreMystere = Math.floor(Math.random() * 10) + 1;

// Récupère les éléments du DOM
const saisie = document.getElementById("num-saisie");
const bouton = document.getElementById("submit-btn");
const message = document.getElementById("message");

// Fonction de vérification
function verifierNombre() {
  const valeur = parseInt(saisie.value);

  // Vérifie si la saisie est valide
  if (isNaN(valeur) || valeur < 1 || valeur > 10) {
    message.textContent = "Veuillez entrer un nombre entre 1 et 10 !";
    message.style.color = "orange";
    return;
  }

  // Compare avec le nombre mystère
  if (valeur === nombreMystere) {
    message.textContent = "Bravo ! Vous avez deviné le bon nombre.";
    message.style.color = "lime";
  } else {
    message.textContent = "Raté ! Essayez encore.";
    message.style.color = "red";
  }
}

// Écouteur sur le bouton
bouton.addEventListener("click", verifierNombre);

// Écouteur sur la touche Entrée
saisie.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    verifierNombre();
  }
});
