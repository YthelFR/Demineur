// Initialisation du progamme
// Choix des niveaux à jouer - Mise en place de tableaux pour initialiser les cases/mines selon la difficulté

let Demineur = {
  name: "Demineur",
  difficultees: {
    facile: {
      lignes: 10,
      colonnes: 10,
      mines: 8,
    },
    normal: {
      lignes: 14,
      colonnes: 14,
      mines: 18,
    },
    difficile: {
      lignes: 18,
      colonnes: 18,
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

  initialisation: function () {
    this.commencerJeu("facile");
  },

  // Initialisation du jeu selon la difficulté

  commencerJeu: function (difficulte) {
    this.parametres = this.difficultees[difficulte];
    this.demarrerPlateau();
    this.resetPlateau();
  },

  // Création du plateau de jeu sur la page HTML, création des classes/ID pour lier au CSS

  demarrerPlateau() {
    plateau = document.getElementById("plateau");

    // Pour effacer le résultat de la partie précédente
    plateau.innerHTML = "";
    document.getElementById("resultat").innerHTML = "";

    bordure = document.createElement("table");
    terrain = document.createElement("terrain");
    bordure.appendChild(terrain);

    // Empêcher l'utilisateur de pouvoir cliquer en dehors de la zone de jeu afin d'éviter
    // un bug, pour sécuriser la zone.
    bordure.setAttribute("oncontextmenu", "return false;");

    bordure.className = "terrain";
    plateau.appendChild(bordure);

    // Création des cases du jeu avec une fonction "if" afin de récupérer les informations de
    // difficultés (nombre de lignes/colonnes) et les représenter à l'écran.

    for (i = 1; i <= this.parametres["lignes"]; i++) {
      // Création des lignes
      ligne = document.createElement("tr");

      // Création des colonnes et cases
      for (j = 1; j <= this.parametres["colonnes"]; j++) {
        cellule = document.createElement("td");
        cellule.id = "cellule-" + i + "-" + j;
        cellule.className = "cellule";
        cellule.setAttribute(
          "onclick",
          this.name + ".verifierPosition(" + i + ", " + j + ", true);"
        );
        cellule.setAttribute(
          "oncontextmenu",
          this.name + ".marquerPosition(" + i + ", " + j + "); return false;"
        );
        ligne.appendChild(cellule);
      }
      terrain.appendChild(ligne);
    }

    // Définition d'une action au clic pour l'utilisateur afin de pouvoir cliquer sur les
    // cases du jeu.

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

  resetPlateau() {
    // Initialisation du terrain avec toutes les cases à 0.
    // Je mets les lignes et les colonnes à 0.

    this.jeu.terrain = new Array();
    for (i = 1; i <= this.parametres["lignes"]; i++) {
      this.jeu.terrain[i] = new Array();
      for (j = 1; j <= this.parametres["colonnes"]; j++) {
        this.jeu.terrain[i][j] = 0;
      }
    }

    // Initialisation des mines.
    for (i = 1; i <= this.parametres["mines"]; i++) {
      x = Math.floor(Math.random() * (this.parametres["colonnes"] - 1) + 1);
      y = Math.floor(Math.random() * (this.parametres["lignes"] - 1) + 1);
    }
    while (this.jeu.terrain[x][y] == -1) {
      x = Math.floor(Math.random() * (this.parametres["colonnes"] - 1) + 1);
      y = Math.floor(Math.random() * (this.parametres["lignes"] - 1) + 1);
    }
    this.jeu.terrain[x][y] = -1;

    for (j = x - 1; j <= x + 1; j++) {
      if (j == 0 || j == this.parametres["colonnes"] + 1) {
        continue;
      }
      for (k = y - 1; k <= y + 1; k++) {
        if (k == 0 || k == this.parametres["lignes"] + 1) {
          continue;
        }
        if (this.jeu.terrain[j][k] != -1) {
          this.jeu.terrain[j][k]++;
        }
      }
    }
    this.jeu.statut = 1;
  },
};
