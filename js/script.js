// ============================
// SCRIPT qui va importer la class DEMINEUR.
// ============================

import Demineur from "./classes/demineur.js";

// Initialisation du programme

let demineurInstance = new Demineur();
demineurInstance.initialisation();

// AddEventListener pour les boutons.

document.querySelectorAll(".menu").forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    const difficulty = menuItem.className.split(" ")[1];
    demineurInstance.commencerJeu(difficulty);
  });
});
