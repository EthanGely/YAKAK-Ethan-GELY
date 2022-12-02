# YAKAY - made by Ethan GELY
Yakak est un site de réservation de voyages. Mais, ce n'est pas tout ! Yakak, c'est aussi des concepts innovants, comme des voyages virtuels immersifs pour les petits et les grands.

Venez découvir la meilleure contrefacon de KAYAK dès maintenant.

## Accès au site
L'ensemble des TP sont disponibles sur un seul et même site, à l'adresse suivante : `https://gelye.alwaysdata.net/FRONT-END/YAKAK-Ethan-GELY`

Pourquoi avoir choisit d'héberger les TP ? Pour les raisons suivantes :
 - Facilité d'accès
    - Pas besoin de parcourir l'arborescence des fichiers pour trouver l'index.
 - Factorsation de nombreux fichiers
    - Avec l'arborescence actuelle, de nombreux fichiers sont réutilisés par les différentes version. C'est par exemple le cas des images ou des vidéos. Cela évite de dupliquer de nombreuses fois des fichiers.
    - Les navigateurs récents n'acceptent pas cette arborescence (le fait de lire des fichiers dans des dossiers parents) si on travaille en local. L'utilisation du serveur règle ce problème (voir problème Cross-Origin / CORS).
    
## Choix techniques
Comme vous l'avez surement remarqué, ce site (en version normale) partage, entre autres, un header et un footer identique pour chaque page.
Afin de mettre en place cette fonctionalité, il a fallu utiliser jQuery, ainsi que la fonction `load()`. Associée a des focntions "faites maison", il a été possible de rendre actif le bon lien, selon le nom de la page actuelle.

L'utilisation de jQuery pour ajouter des "morceaux de pages" n'est pas forcément très optimisé, mais cela évitait de copier de nombreuses fois un header et un footer.

Comme décrit plus haut, le choix d'héberger le site n'est pas vraiment un choix mais plutôt une contrainte. En effet, il semble impossible de récupérer des fichiers de dossiers parents depuis un site en local, à cause de politiques de sécurité [Cross-Origin / CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS).

La version ONE-PAGE aurait pû être faite en incluant la totalité des pages dans l'index, et de n'afficher (via un `display : block;`) que les parties concernées.
Cette solution ne me convenait pas, et j'ai préféré utiliser à nouveau la fonction jQuery `load()`.
Cela cause des problèmes de performances importantes. Pour pouvoir naviguer sur cette version, mieux vaut être patient, et attendre que tout soit finalisé côté JS (Le chargement est réelement fini une fois qu'une barre apparait sous le nom de la page actuelle).

## Utilisation
L'utilisation de ce site devrait être intuitive. Néanmoins, voici un peu d'aide pour la page destinations :

Vous pourrez afficher les destinations en cliquant sur `Trouver votre destination`. Pour passer en mode édition, vous trouverez un icone cadenas `🔒`, qui vous demandera un mot de passe.
Celui ci est : `mdp`.

Vous pourrez ensuite cliquer sur le bouton modifier (à droite de la ligne si c'est un tableau, en bas de la carte si c'est une carte).
Au niveau de l'image, vous pouvez utiliser un lien vers une image tirée d'internet, ou le nom d'une image présente dans le dossier `Common/images`. Il n'est malheureusement pas possible d'uploader une image depuis votre PC...

Pour sauvegarder vos modifications, il suffit de re-cliquer sur le bouton éditer. Cliquer sur le bouton cadenas permettera aussi de sauvegarder les modifications, en plus de remettre la page en mode "lecture".

Ces modifications sont enregistrées dans le local storage, et sont donc conservées entre les différentes sessions. Si vous supprimez toutes les destination, les destinations de base seront remises. Il est aussi possible de réinitialiser la liste des destinations en entrant la commande `clear()` dans la console.
