# Cahier des charges

Création d'un jeu "Démineur" sur navigateur. Le jeu devra repredre les codes d'un jeu démineur classique :

-> Grille de cases en plateau carré
-> Chaque case sera révélée au clic de l'utilisateur
-> Bombes disséminées sur la grille qui mettront fin à la partie du joueur
-> Des cases vides (0) qui révèleront les autres mêmes cases adjacentes
-> Des cases avec des numeros qui indiqueront la proximité des mines cachées

Il y aura 3 niveaux de difficulté différentes : "facile", "moyen" et "difficile". Le niveau de difficulté augmentera le nombre de cases sur le plateau ainsi que le nombre de bombes disséminées sur la grille.

# Règles du jeu démineur :

Les règles du jeu sont simples : le joueur doit cliquer sur une case de la grille afin de révèler un nombre qui qui indique les mines se trouvant dans les cases adjacentes. Le joueur devra donc déduire l'emplacement de la mine avec les informations des cases révélées.

Si le joueur clique sur une mine : la partie est terminée. Il faut donc être prudent pour éviter les cases piégées et ne révéler que les cases sûres.

Le niveau augmente avec le nombre de cases et de mines présentes sur la grille.
