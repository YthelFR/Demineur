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

  // Initialisation du tableau de jeu (lignes/colonnes/emplacement des mines)
  // en fonction de la difficulté choisie

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

    // Définition d'une action au clic pour l'utilisateur afin de pouvoir cliquer sur les
    // cases du jeu.

    // Empêcher l'utilisateur de pouvoir cliquer en dehors de la zone de jeu afin d'éviter
    // un bug, pour sécuriser la zone.

    // Ajouter une fonction qui permet de rendre les mines à des emplacements aléatoires
    // sur toutes les difficultés du jeu afin que chaque partie soit différente.
  },

  // Ajout d'une fonction qui permet à l'utilisateur, en cas de clic-droit sur une case, de
  // marquer la case afin de marquer les potentielles position des mines. Bien vérifier quelle
  // case peut-être marquée (au cas où l'utilisateur tente de marquer une case qui est déjà révélée).

  // Rajouter à la fonction une fonction qui permet d'enlever ce marquage précédemment posé.

  // Ajouter une fonction essentielle pour un démineur : révéler toutes les cases dites "vides" ou "0"
  // qui sont adjacentes les unes aux autres afin de révéler le terrain vide.

  // Ajouter une fonction qui, lorsque l'utilisateur trouve une case "minée", met fin à la partie.

  // Ajouter la fonction qui permet à l'utilisateur de savoir si des mines sont à proximité.
  // C'est-à-dire d'afficher les numeros "1", "2", "3"...

  // Ajouter les fonctions qui permettent d'afficher la "Victoire" ou la "Défaite" de l'utilisateur.

  // Fonction reset du plateau en cas de partie terminée ou qui initialisera les données du programme

  resetPlateau() {},
};
