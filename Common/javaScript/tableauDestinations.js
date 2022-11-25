//Variable globale qui contient les destinations du tableau
var destinations = [];

//Si l'utilisateur est en mode admin ou non (de base, non)
var isAdmin = false;

//Si les destinations sont affichées ou non dans le tableau
var isShown = false;


//Fonction lancée à l'initialisation
function initDestinations() {
    //On attend de récupérer les destinations, puis on les affiche
    getDestinations().then(r => afficheDestinations());
}


//Récupère un tableau de destinations via le localStorage ou un fichier s'il n'existe pas
async function getDestinations() {
    //On essaye de récupérer les destinations du local storage
    const dest = localStorage.getItem('destinations');

    //S'il n'y a pas de destinations enregistrées, on ajoute la liste de base (contenue dans un fichier)
    //Et on met le contenu de cette liste dans le local storage.
    if (dest === undefined || dest === "[]" || dest === "" || dest === null) {
        const requestURL = '/src/include/data/destination.json';
        const request = new Request(requestURL);

        const response = await fetch(request);

        //let destinationsTemp = await response.json();

        createDestinationsObjects(await response.json());

        localStorage.setItem("destinations", JSON.stringify(destinations));


        //Sinon, on utilise la liste enregistrée
    } else {
        //Création des objets destination
        createDestinationsObjects(JSON.parse(dest));

    }
}

//Crée tous les objets destination, et les ajoute à la liste globale.
function createDestinationsObjects(destFromStorage) {
    //Pour chaque destination
    for (let i = 0; i < destFromStorage.length; i++) {
        //On récupère la destination courante
        let currentDest = destFromStorage[i];
        //Et on l'ajoute à la liste.
        destinations.push(new Destination(currentDest['image'], currentDest['destination'], currentDest['offre'], currentDest['prix']));
    }
}


//Cette fonction ajoute les destinations contenues dans la variable globale "destinations".
//Attention : Seules les elements contenus dans la variable globale seront affichés.
//Les autres éléments seront supprimés

function afficheDestinations() {

    //On récupère le corps du tableau et on le vide
    let tbody = document.getElementById("bodyDestination");
    tbody.innerHTML = "";

    //Si le tableau n'est pas affiché, on le crée avec les destinations de la variable globale
    if (!isShown) {
        let thead = document.getElementById("trHeadDestination");

        if (thead.lastChild.innerHTML === "Edition") {
            thead.removeChild(thead.lastChild);
        }

        //Pour chaque nouvelle destination
        for (let i = 0; i < destinations.length; i++) {
            //On crée un élément <tr> (une ligne)
            let tr = document.createElement("tr");

            //Puis une cellule, dans laquelle on ajoute le nom de la destination (avec une maj au début)
            let td1 = document.createElement("td");
            let div = document.createElement("div");
            let p = document.createElement("p");
            p.innerText = destinations[i]["destination"].substring(0, 1).toUpperCase() + destinations[i]["destination"].substring(1);

            //On crée une image, puis selon le type (lien internet ou lien local) on ajoute la source
            let img = document.createElement("img");
            if (destinations[i]["image"].includes("data:image/") || destinations[i]["image"].includes("https://") || destinations[i]["image"].includes("http://")) {
                img.src = destinations[i]["image"];
            } else {
                img.src = "/src/include/images/" + destinations[i]["image"];
            }
            //Puis le texte alt de l'image sera "image" + destination
            img.alt = "Image " + destinations[i]["destination"];

            //On ajoute l'image dans la balise <td>, puis on ajoute ce <td> dans le <tr>
            div.appendChild(img);
            div.appendChild(p);
            td1.appendChild(div);
            tr.appendChild(td1);

            //On crée un autre <td>, puis on note le nom de l'offre
            let td2 = document.createElement("td");
            td2.innerText = destinations[i]["offre"];

            //et on ajoute ce <td> au <tr>
            tr.appendChild(td2);

            //On crée un autre <td>, puis on note le prix de l'offre
            let td3 = document.createElement("td");
            td3.innerText = destinations[i]["prix"];

            //et on ajoute ce <td> au <tr>
            tr.appendChild(td3);

            //On crée un ultime <td> où on crée le bouton pour visualiser l'offre
            let td4 = document.createElement("td");
            let button = document.createElement("button");
            button.innerText = "Découvrir l'offre";
            button.classList.add("destination");
            button.setAttribute('onclick', 'setSelectedDestination("' + destinations[i]["destination"] + '")');

            //On ajoute le bouton au td, puis le td au tr, et finalement le tr au tbody
            td4.appendChild(button);

            tr.appendChild(td4);

            tbody.appendChild(tr);

        }

        //Si l'utilisateur est admin, on ajoute les boutons correspondants
        if (isAdmin) {
            afficherModeAdmin();
        }
    }
    //Finalement, on inverse l'état du tableau (si affiché, on le masque, si masqué, on l'affiche).
    isShown = !isShown;
}


//Cette fonction ajoute une entrée dans la liste des destinations, puis met à jour la page.
//Il suffit de fournir un array comme suit (avec une ou plusieurs destinations) :
// ATTENTION : bien noter qu'il y a un array imbriqué dans un autre array (comme si on stockait des objets "destination" dans un array).
//  [
//      {
//          image : "espagne.png", //-- l'image doit être placée dans le dossier "images". Seul le nom et l'extension doivent être précisé (pas besoin du chemin). Le nom de l'image sera utilisé dans le "alt" Possiblité d'utiliser une URL vers une image --//
//          destination : "Espagne", //-- Le nom de la destination (une majuscule est mise automatiquement au début). --//
//          offre : "Circuit plage, hôtel 4 *", //-- description de l'offre --//
//          prix : "800 €" //-- Prix de l'offre (la devise n'est pas mise automatiquement --//
//      },
//
//      {
//          image : "maroc.png",
//          destination : "Maroc",
//          offre : "Circuit Oasis, hôtel 4 *",
//          prix : "1000 €"
//      }
//  ]

function addDestinations(destinationsToAdd) {
    for (let i = 0; i < destinationsToAdd.length; i++) {
        //recherche dans un array sans casse
        if (destinations.find(({destination}) => destination.toLocaleLowerCase() === destinationsToAdd[i]["destination"].toLocaleLowerCase()) === undefined) {
            //Si la destination n'existe pas, on l'ajoute à l'array global.
            destinations.push(destinationsToAdd[i]);
        } else {
            //Sinon, si la destination existe,
            //On trouve son index, et on la remplace par la nouvelle
            ///////NON FONCTIONNEL POUR L'INSTANT//////////
            console.log(destinations);
            const index = destinations.indexOf(destinationsToAdd[i]["destination"]);
            console.log(index)
            if (index > -1) {
                destinations.splice(index, 1);
                destinations.push(destinationsToAdd[i]);
            }
        }
    }
    //Puis on stocke le tout dans le local storage
    localStorage.setItem("destinations", JSON.stringify(destinations));

    isShown = false;
    //Et on affiche le résultat
    afficheDestinations();
}


//Modifie le statut de la persone (et l'affichage dans la table)
//Requiert un mot de passe (qui est : mdp)
function changeAdmin(isError = false) {

    //Le message de base (si pas d'erreur encore faite)
    let msgPrompt = "Mot de passe";
    //Si l'user vient de faire une tentative infructueuse
    if (isError) {
        msgPrompt = "Mot de passe erroné, réessayez";
    }

    let btnAdmin = document.getElementById("changeAdmin");
    let btnAddDest = document.getElementById("btnAddDest");

    //Dévérouillage du mode admin
    if (isAdmin == false) {
        //On demande le mot de passe
        let mdp = prompt(msgPrompt, "le mot de passe est 'mdp'");
        //Cette condition vérifie que le mot de passe sont bien "mdp"
        //Dans le contexte de ce site, la sécurisation du mot de passe n'est pas à faire (en plus on ne vérifie pas des mots de passe avec du JS, sinon le client a le code à sa disposition)
        if (mdp === "mdp") {
            isAdmin = true;
            btnAdmin.innerHTML = "🔓";
            btnAddDest.style.display = "initial";
            afficherModeAdmin();
        } else if (mdp != null) {
            //On relance la fonction, true veut dire que le mdp n'est pas le bon
            changeAdmin(true);
        }
    } else {
        //Vérouillage du mode admin
        isAdmin = false;
        btnAdmin.innerHTML = "🔒";
        btnAddDest.style.display = "none";
        resetRows();
        afficherModeAdmin();
    }
}

//Affiche les différentes options du mode admin dans le tableau
//En fonction de si la personne est admin ou non
function afficherModeAdmin() {
    let tbody = document.getElementById("bodyDestination");
    let thead = document.getElementById("trHeadDestination");
    let tableRows = tbody.children;

    if (isAdmin) {
        let tdHead = document.createElement("td");
        tdHead.innerHTML = "Edition";
        thead.appendChild(tdHead);


        for (let i = 0; i < tableRows.length; i++) {
            let tdBody = document.createElement("td");
            let button = document.createElement("button");
            button.classList.add("btn");
            button.innerHTML = "éditer";
            button.onclick = function () {
                modifierRow(tableRows[i])
            };
            tdBody.appendChild(button);

            let button2 = document.createElement("button");
            button2.classList.add("btn");
            button2.innerHTML = "❌";
            button2.onclick = function () {
                deleteRow(tbody, tableRows[i], i)
            };
            tdBody.appendChild(button2);

            tableRows[i].appendChild(tdBody);
        }
    } else {
        if (thead.lastChild.innerHTML === "Edition") {
            thead.removeChild(thead.lastChild);

            for (let i = 0; i < tableRows.length; i++) {
                tableRows[i].removeChild(tableRows[i].lastChild);
            }
        }
    }


}

//Permet de rendre une ligne éditable
function modifierRow(tableRow) {
    let tds = tableRow.children;
    let divImage = tds[0].children[0].children;
    let needReset = false;

    //Modification de l'image et du titre de la destination
    for (let i = 0; i < divImage.length; i++) {
        let input = document.createElement("input");
        if (divImage[i].outerHTML.includes("input")) {
            needReset = true;
        } else {
            let text = "";
            if (i === 0) {
                text = divImage[i].src;
                text = text.split("/")[text.split("/").length - 1];
            }else{
                text = divImage[i].innerHTML;
            }
            divImage[i].outerHTML = "";
            input.id = text;

            input.type = "text";
            input.value = text;
            if (i === 0) {
                tds[0].children[0].insertBefore(input, divImage[divImage.length - 1]);
            }else {
                tds[0].children[0].appendChild(input);
            }
        }
    }

    //les deux cases du milieu du tableau
    for (let i = 1; i < tds.length - 2; i++) {
        if (tds[i].innerHTML.includes("input")) {
            needReset = true;
        } else {
            let input = document.createElement("input");
            let text = tds[i].innerHTML;
            tds[i].innerHTML = "";
            input.type = "text";
            input.value = text;

            tds[i].appendChild(input);
        }
    }
    if (needReset) {
        resetRows();
    }
}

//Remet les lignes dans leur forme originale = désactive le mode modification pour toutes les lignes
function resetRows() {
    let tbody = document.getElementById("bodyDestination");
    let trs = tbody.children;
    for (let i = 0; i < trs.length; i++) {
        let tds = trs[i].children;
        let divImage = tds[0].children[0].children;

        for (let j = 0; j < divImage.length; j++) {
            if (tds[0].children[0].children[j].outerHTML.includes("input")) {
                let text = tds[0].children[0].children[j].value;
                tds[0].children[0].children[j].outerHTML = "";
                let p = "";
                if (j === 0) {
                    p = document.createElement("img");
                    if (text.includes("data:image/") || text.includes("https://") || text.includes("http://")) {
                        p.src = text;
                    } else {
                        p.src = "/src/include/images/" + text;
                    }
                    tds[0].children[0].insertBefore(p, divImage[divImage.length - 1]);
                    destinations[i]["image"] = text;
                }else{
                    destinations[i]["destination"] = text;
                    p = document.createElement("p");
                    p.innerHTML = text;
                    tds[0].children[0].appendChild(p);
                }
            }
        }



        for (let j = 1; j < tds.length - 2; j++) {
            if (tds[j].innerHTML.includes("input")) {
                let text = tds[j].children[0].value;
                tds[j].innerHTML = text;
                if (j == 1) {
                    destinations[i]["offre"] = text;
                } else {
                    destinations[i]["prix"] = text;
                }
            }
        }

    }
    localStorage.setItem("destinations", JSON.stringify(destinations));
}

//Permet d'ajouter une destination via des messages sur la page
function ajouterDestination() {
    let nomDest = prompt("Entrez le nom de la destination :");
    if (nomDest != null && nomDest != "") {
        let image = prompt("Entrez le nom ou le lien de l'image :");
        if (image != null && image != "") {
            let offre = prompt("Entrez le nom de l'offre :");
            if (offre != null && offre != "") {
                let prix = prompt("Entrez le prix avec la devise :");
                if (prix != null && prix != "") {
                    let dest = [{
                        "image": image,
                        "destination": nomDest,
                        "offre": offre,
                        "prix": prix
                    }];
                    addDestinations(dest);
                }
            }
        }
    }
}

//Supprime une ligne (du tableau, de la variable globale, et du local storage
function deleteRow(tbody, child, i) {
    tbody.removeChild(child);
    destinations.splice(i, 1);
    localStorage.setItem("destinations", JSON.stringify(destinations));
}

//Sert à définir sur quelle destination l'utilisateur a cliqué
//Et garde cette info dans le local storage
function setSelectedDestination(nomDest) {
    localStorage.setItem("selectedDestination", nomDest);
    window.location.href = "destinationInfo.html";
}


/////////////Pour modifier le tableau via le navigateur///////////////////////

//Supprime le contenu du local storage
function clear() {
    localStorage.clear();
}

///////////////////////////////////////////////////////
