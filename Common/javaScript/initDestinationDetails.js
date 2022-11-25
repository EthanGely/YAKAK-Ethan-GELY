var dest;
var destinations = [];
var selectedDestination;


function initPageDest() {
    dest = localStorage.getItem("selectedDestination");
    destinations = JSON.parse(localStorage.getItem("destinations"));

    if (dest != null) {


        if (destinations.find(({destination}) => destination.toLocaleLowerCase() === dest.toLocaleLowerCase()) !== undefined) {
            for (let i = 0; i < destinations.length; i++) {
                if (destinations[i]["destination"] == dest) {
                    selectedDestination = destinations[i];
                    destinations.splice(i, 1);
                }
            }
            if (selectedDestination != null) {
                document.title += " " + dest;
                if (selectedDestination["image"].includes("data:image/") || selectedDestination["image"].includes("https://") || selectedDestination["image"].includes("http://")) {
                    document.getElementById("imgDest").src = selectedDestination["image"];
                } else {
                    document.getElementById("imgDest").src = "/src/include/images/" + selectedDestination["image"];
                }
                document.getElementById("titleDest").innerHTML = selectedDestination["destination"];
                document.getElementById("titlePrix").innerHTML = "Un voyage en " + selectedDestination["destination"] + " pour " + selectedDestination["prix"] + " ? Une aubaine !";
                document.getElementById("descrDest").innerHTML = 'Profitez d\'un voyage complet en ' + selectedDestination["destination"] + ' pour la ridicule somme de ' + selectedDestination["prix"] +'.<br>Cette offre comprend le vol, l\'hôtel, le petit déjeuner, le goûter de 14h et de 16h30, mais aussi un bon d\'achat journalier de 30€ à dépenser dans tous les produits<span class="nutriscore"><img src="../images/nutri-score.png" alt="nutri-score"/> </span> uniquement.<br>Dépechez-vous, il ne reste que <strong>' + Math.floor(Math.random() * 10 + 1) + '</strong> offres !'

                loadOtherDest();
            } else {
                logout();
            }
        } else {
            logout();
        }
    } else {
        logout();
    }
}

function loadOtherDest() {
    let content = document.getElementsByClassName("cards")[0];
    let line;

    shuffledest();

    for (let i = 0; i < destinations.length; i++) {
        if (i%3 === 0) {
            line = document.createElement("div");
            line.classList.add("flex");
            line.style = 'margin: auto;justify-content: space-evenly; margin-bottom:3rem;';
        }

        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        if (destinations[i]["image"].includes("data:image/") || destinations[i]["image"].includes("https://") || destinations[i]["image"].includes("http://")) {
            img.src = destinations[i]["image"];
        } else {
            img.src = "/src/include/images/" + destinations[i]["image"];
        }
        img.alt = destinations[i]["destination"];
        img.classList.add("card-img");
        img.setAttribute('onclick','setSelectedDestination("' + destinations[i]["destination"] + '")');

        card.appendChild(img);

        let cBody = document.createElement("div");
        cBody.classList.add("card-body");

        card.appendChild(cBody);

        let title = document.createElement("h4");
        title.innerHTML = destinations[i]["destination"];

        cBody.appendChild(title);

        let offre = document.createElement("p");
        offre.innerHTML = destinations[i]["offre"];

        cBody.appendChild(offre);

        let prix = document.createElement("p");
        prix.innerHTML = destinations[i]["prix"];

        cBody.appendChild(prix);

        let button = document.createElement("button");
        button.innerHTML = "Découvrir l'offre";
        button.classList.add("destination");
        button.setAttribute('onclick','setSelectedDestination("' + destinations[i]["destination"] + '")');

        cBody.appendChild(button);

        line.appendChild(card);

        content.appendChild(line);
    }
}

function shuffledest() {
    for (let i = destinations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = destinations[i];
        destinations[i] = destinations[j];
        destinations[j] = temp;
    }
}

function logout() {
    window.location.href = "../../TP03/src/include/site/destinations.html";
}