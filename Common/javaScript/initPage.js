$(function(){
    $("#header").load("/Common/header_footer/header.html");
    $("#footer").load("/Common/header_footer/footer.html");
    $(function() {
        setTimeout(() => {  init(); }, 500);
    });

});


function init(){
    var nom = window.location.pathname;
    nom = nom.split("/");
    nom = nom[nom.length - 1];
    nom = nom.substr(0, nom.lastIndexOf("."));
    nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");
    if (nom.includes("destinationInfo")) {
        document.getElementById("destinations").classList.add("active");
        return;
    }
    setTimeout(() => {
        var active = document.getElementById(nom);
        if (active == null) {
            while (active == null) {
                active = document.getElementById(nom);
            }
        }
        active.classList.add("active");
        if (nom.includes("voyage")){
            document.getElementById("voyage").classList.add('active');
        }
    }, 1000);
}


function actionSousMenu(id) {
    var sousMenu = document.getElementById(id);
    var etat = sousMenu.style.display;
    if (id.split("-")[1] != null) {
        fermerSousMenu(id.split("-")[0]);
    } else {
        fermerSousMenu();
    }


    if (etat == "block") {
        sousMenu.style.display = "none";
    } else {
        sousMenu.style.display = "block";
    }

}

function fermerSousMenu(keepOpen) {
    var sousMenu = document.getElementsByClassName("sousMenu");
    var sousMenuOuvert = document.getElementById(keepOpen);
    for (var i = 0; i < sousMenu.length; i++) {
        sousMenu[i].style.display = "none";
    }
    if (sousMenuOuvert != null)
        sousMenuOuvert.style.display = "block";


}

function toTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function afficherWarning() {
    let warnings = document.getElementsByClassName("warning");
    var btn = document.getElementById("btnWarning");
    for (let i = 0; i < warnings.length; i++) {
        if (warnings[i].classList.contains("visuallyHidden")) {
            warnings[i].classList.remove("visuallyHidden");
            btn.innerHTML = "Masquer le message";
        } else {
            warnings[i].classList.add("visuallyHidden")
            btn.innerHTML = "L'audio ne se lance pas automatiquement ?";

        }

    }
}