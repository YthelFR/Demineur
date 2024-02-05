// Initialisation du progamme
// Choix des niveaux à jouer - Mise en place de tableaux pour initialiser les cases/mines selon la difficulté

let Demineur = {
  name: "Demineur",
  difficultees: {
    facile: {
      lines: 10,
      columns: 10,
      mines: 8,
    },
    normal: {
      lines: 14,
      columns: 14,
      mines: 18,
    },
    difficile: {
      lines: 18,
      columns: 18,
      mines: 36,
    },
  },

  parametres: {},

  // Initialisation du tableau de jeu en fonction de la difficulté choisie

  jeu: {
    statut: 0,
    terrain: new Array(),
  },

  initialisation: function () {},

  // Initialisation du jeu selon la difficulté

  commencerJeu: function (difficulte) {
    this.parametres = this.difficultees[difficulte];
    this.demarrerPlateau();
    this.resetPlateau();
  },

  // Création du plateau de jeu sur la page HTML, création des classes/ID pour lier au CSS

  demarrerPlateau() {
    let plateau = document.getElementById("plateau");
    plateau.innerHTML = "";
    document.getElementById("resultat").innerHTML = "";

    bordure = document.createElement("table");
    terrain = document.createElement("terrainBody");
    bordure.appendChild(terrain);
    bordure.className = "terrain";
    plateau.appendChild(bordure);

    // Création des cases du jeu avec une fonction "if" afin de récupérer les informations de
    // difficultés (nombre de lignes/colonnes/mines) et les représenter à l'écran.
  },

  // Fonction reset du plateau en cas de partie terminée ou qui initialisera les données du programme

  resetPlateau() {},
};
