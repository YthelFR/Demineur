// ============================
// EXPORT de la class DEMINEUR dans le Script.
// ============================

export default class Demineur {
  // ============================
  // PROPRIETES
  // ============================

  // Définition des propriétés qui vont être utilisées dans la class.
  name;
  difficultees;
  parametres;
  jeu;
  // ============================
  // CONSTRUCTOR
  // ============================

  // Mise en place du constructor.

  constructor() {
    this.name = "Demineur";

    // Difficultées rangées sous forme de tableau.

    this.difficultees = {
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
    };
    this.parametres = {};
    this.jeu = {
      statut: 0,
      terrain: [],
    };
  }

  // ============================
  // METHODES
  // ============================

  // Méthode qui initialise le jeu en facile dès le chargement de la page (par défaut).

  initialisation() {
    this.commencerJeu("facile");
  }

  // Méthode qui initialise le jeu selon la difficulté choisie par l'utilisateur.

  commencerJeu(difficulte) {
    this.parametres = this.difficultees[difficulte];
    this.demarrerPlateau();
    this.resetPlateau();
  }

  // Méthode qui démarre le plateau de jeu pour l'utilisateur à l'initialisation ou au choix de difficulté.

  demarrerPlateau() {
    // Stocke l'élément dans plateau.
    let plateau = document.getElementById("plateau");

    // Pour effacer le résultat de la partie précédente. Vide le plateau pour revenir à 0.
    plateau.innerHTML = "";
    document.getElementById("resultat").innerHTML = "";

    // Créer la bordure du plateau pour définir la zone.
    let bordure = document.createElement("table");

    // Empêcher l'utilisateur de pouvoir cliquer en dehors de la zone de jeu afin d'éviter un bug, pour sécuriser la zone.
    bordure.setAttribute("oncontextmenu", "return false;");

    // Stocke le terrain dans cet élément.
    let terrain = document.createElement("tbody");
    bordure.appendChild(terrain);

    bordure.className = "terrain";
    plateau.appendChild(bordure);

    // Debug de la création des éléments sur le plateau de jeu.

    const verifierPositionPrincipale = this.verifierPosition.bind(this);
    const marquerPositionPrincipale = this.marquerPosition.bind(this);

    // Création des cases du jeu avec une fonction "if" afin de récupérer les informations de
    // difficultés (nombre de lignes/colonnes) et les représenter à l'écran.

    for (let i = 1; i <= this.parametres["lignes"]; i++) {
      // Création des lignes.
      let ligne = document.createElement("tr");

      // Création des colonnes (donc des cases).
      for (let j = 1; j <= this.parametres["colonnes"]; j++) {
        let cellule = document.createElement("td");
        cellule.id = "cellule-" + i + "-" + j;
        cellule.className = "cellule";

        // Mise en place du clic-droit qui permet à l'utilisateur de marquer la case.
        // Appel des fonctions pour qu'elles soient correctement appliquées sur le jeu.
        cellule.onclick = () => verifierPositionPrincipale(i, j, true);
        cellule.oncontextmenu = (event) => {
          event.preventDefault();
          marquerPositionPrincipale(i, j);
        };
        ligne.appendChild(cellule);
      }
      terrain.appendChild(ligne);
    }
  }

  // Méthode reset du plateau en cas de partie terminée ou qui initialisera les données du programme.

  resetPlateau() {
    // Initialisation du terrain avec toutes les cases à 0.
    // Je mets les lignes et les colonnes à 0.

    // Initialisation du tableau vide.
    this.jeu.terrain = new Array();

    // Boucle pour initialiser toutes les cases à la valeur de 0.
    for (let i = 1; i <= this.parametres["lignes"]; i++) {
      this.jeu.terrain[i] = new Array();
      for (let j = 1; j <= this.parametres["colonnes"]; j++) {
        this.jeu.terrain[i][j] = 0;
      }
    }

    // Initialisation des mines.
    // Ajouter une fonction qui permet de rendre les mines à des emplacements aléatoires
    // sur toutes les difficultés du jeu afin que chaque partie soit différente.

    for (let i = 1; i <= this.parametres["mines"]; i++) {
      let x = Math.floor(Math.random() * (this.parametres["colonnes"] - 1) + 1);
      let y = Math.floor(Math.random() * (this.parametres["lignes"] - 1) + 1);
      // Si une mine est déjà posée à un endroit, cela va permettre de trouver une autre case libre où poser la mine.
      while (this.jeu.terrain[x][y] == -1) {
        x = Math.floor(Math.random() * (this.parametres["colonnes"] - 1) + 1);
        y = Math.floor(Math.random() * (this.parametres["lignes"] - 1) + 1);
      }
      this.jeu.terrain[x][y] = -1;

      // Ajouter la fonction qui permet à l'utilisateur de savoir si des mines sont à proximité.
      // C'est-à-dire d'afficher les numeros "1", "2", "3"...

      for (let j = x - 1; j <= x + 1; j++) {
        if (j == 0 || j == this.parametres["colonnes"] + 1) continue;
        for (let k = y - 1; k <= y + 1; k++) {
          if (k == 0 || k == this.parametres["lignes"] + 1) continue;
          if (this.jeu.terrain[j][k] != -1) this.jeu.terrain[j][k]++;
        }
      }
    }
    // Démarre le jeu.
    this.jeu.statut = 1;
  }

  // Méthode pour vérifier les cases du plateau lors du clic utilisateur.

  verifierPosition(x, y, verifier) {
    if (this.jeu.statut != 1) return; // Sécurité au cas où la partie n'est pas commencée.

    if (this.jeu.terrain[x][y] == -2) {
      return;
    }

    // Bloquer le clic droit sur les cases déjà visitées.
    //Si l'utilisateur a marqué une mine en clic-droit : empêche toute action sur la case.

    if (this.jeu.terrain[x][y] < -90) {
      return;
    } // Enlever les marquages précédemment mis si la case est à 0.

    // Ajouter une fonction qui, lorsque l'utilisateur trouve une case "minée", met fin à la partie.
    if (this.jeu.terrain[x][y] == -1) {
      document.getElementById("cellule-" + x + "-" + y).className =
        "cellule mine";
      this.annoncerDefaite();
      return;
    }

    // Permet de dire si la case est sûre.
    document.getElementById("cellule-" + x + "-" + y).className = "cellule OK";

    // Ajout des constantes pour remplacer l'affichage classique des chiffres après le clic (ex: "1", "2", "3"...) par des images.
    // Je stocke donc le chemin relatif à ces images dans un tableau afin qu'elles soient récupérées au clic utilisateur.

    const numberImages = {
      1: "./medias/numero 1.jpeg",
      2: "./medias/numero 2.png",
      3: "./medias/numero 3.png",
      4: "./medias/numero 4.png",
      5: "./medias/numero 5.png",
    };

    if (this.jeu.terrain[x][y] > 0) {
      let imgElement = document.createElement("img");
      imgElement.src = numberImages[this.jeu.terrain[x][y]];
      document.getElementById("cellule-" + x + "-" + y).appendChild(imgElement);
      imgElement.style.width = "30px";
      imgElement.style.height = "30px";
      this.jeu.terrain[x][y] = -2;

      //Si la case est vide : révèle les autres cases vides.
    } else if (this.jeu.terrain[x][y] == 0) {
      this.jeu.terrain[x][y] = -2;

      // Ajouter une fonction essentielle pour un démineur : révéler toutes les cases dites "vides" ou "0"
      // qui sont adjacentes les unes aux autres afin de révéler le terrain vide.

      for (let j = x - 1; j <= x + 1; j++) {
        if (j == 0 || j == this.parametres["colonnes"] + 1);
        for (let k = y - 1; k <= y - 1; k++) {
          if (k == 0 || k == this.parametres["lignes"] + 1);
          if (this.jeu.terrain[j][k] > -1) {
            this.verifierPosition(j, k, false);
          }
        }
      }
    }

    if (verifier !== false) this.verifierVictoire();
  }

  // Méthode de marquage au clic-droit pour l'utilisateur qui lui permet de "vérouiller" une case qui est potentiellement une bombe.

  marquerPosition(x, y) {
    // Définition d'une action au clic pour l'utilisateur afin de pouvoir cliquer sur les cases du jeu.

    if (this.jeu.statut != 1) return; // Sécurité au cas où la partie n'est pas commencée. Vérifie si le jeu est en cours ou non.

    if (this.jeu.terrain[x][y] == -2) return; // Bloquer le clic droit sur les cases déjà visitées. L'utilisateur ne pourra pas marquer
    //une case qui a déjà été découverte.

    // Ajout d'une fonction qui permet à l'utilisateur, en cas de clic-droit sur une case, de
    // marquer la case afin de verrouiller les potentielles position des mines. Bien vérifier quelle
    // case peut-être marquée (au cas où l'utilisateur tente de marquer une case qui est déjà révélée).
    // Rajouter à la fonction une fonction qui permet d'enlever ce marquage précédemment posé.

    if (this.jeu.terrain[x][y] < -90) {
      document.getElementById("cellule-" + x + "-" + y).className = "cellule";
      document.getElementById("cellule-" + x + "-" + y).innerHTML = "";
      this.jeu.terrain[x][y] += 100;
    } else {
      document.getElementById("cellule-" + x + "-" + y).className =
        "cellule marquée";
      document.getElementById("cellule-" + x + "-" + y).innerHTML = "!";
      document.getElementById("cellule-" + x + "-" + y).style.color = "white";
      document.getElementById("cellule-" + x + "-" + y).style.justifyContent =
        "center";
      document.getElementById("cellule-" + x + "-" + y).style.textAlign =
        "center";
      this.jeu.terrain[x][y] -= 100;
    }
  }

  // Ajouter les méthodes qui permettent d'afficher la "Victoire" ou la "Défaite" de l'utilisateur.

  verifierVictoire() {
    for (let i = 1; i <= this.parametres["lignes"]; i++) {
      for (let j = 1; j <= this.parametres["colonnes"]; j++) {
        let v = this.jeu.terrain[i][j];
        if (v != -1 && v != -2 && v != -101) return;
      }
    }

    this.annoncerVictoire();
  }

  // Affichage de la victoire de l'utilisateur.

  annoncerVictoire() {
    document.getElementById("resultat").innerHTML = "VICTOIRE !";
    document.getElementById("resultat").style.color = "green";
    this.jeu.statut = 0;
  }

  // Affichage de la défaite de l'utilisateur.

  annoncerDefaite() {
    document.getElementById("resultat").innerHTML = "DEFAITE !";
    document.getElementById("resultat").style.color = "red";
    this.jeu.statut = 0;
  }
}
