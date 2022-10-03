<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>YAKAK - Mon espace</title>
</head>
<body>

<?php
    include_once "./header.html";
?>


<?php
    $isConnected = true;
    $currentUser = ["firstName" => "Ethan", "lastName" => "GELY", "phone" => "07 82 99 10 52", "mail" => "ethangely@gmail.com", "address" => "29 Quai Claude Bernard", "complement" => "", "zipcode" => "38000", "city" => "Grenoble", "country" => "France"];

    if ($isConnected){?>
        <h2>Mes informations</h2>
        <form action="">
            <div class="row">
                <label for="firstName" class="form-label">Prénom</label>
                <input id="firstName" type="text" value="<?php $currentUser["firstName"] ?>">

                <label for="lastName" class="form-label">Nom</label>
                <input id="lastName" type="text" value="<?php $currentUser["lastName"] ?>">
            </div>

            <div class="row">
                <label for="phone" class="form-label">Téléphone (mobile)</label>
                <input id="phone" type="tel" value="<?php $currentUser["phone"] ?>">

                <label for="mail" class="form-label">Adresse mail</label>
                <input id="mail" type="email" value="<?php $currentUser["mail"] ?>">
            </div>

            <div class="row">
                <label for="address" class="form-label">Adresse postale</label>
                <input id="address" type="text" value="<?php $currentUser["address"] ?>">

                <label for="complement" class="form-label">Complément d'adresse</label>
                <input id="complement" type="text" value="<?php $currentUser["complement"] ?>">
            </div>

            <div class="row">
                <label for="country" class="form-label">Pays</label>
                <input id="country" type="text" value="<?php $currentUser["country"] ?>">
            </div>

            <div class="row">
                <label for="zipcode" class="form-label">Code postal</label>
                <input id="zipcode" type="text" value="<?php $currentUser["zipcode"] ?>">

                <label for="city" class="form-label">Ville</label>
                <input id="city" type="text" value="<?php $currentUser["city"] ?>" disabled>
            </div>


            <button>Mettre à jour les informations</button>
        </form>


        <h2>Messagerie</h2>


        <h2>Historique des commandes</h2>
    <?php }else{?>

    <?php
    }
?>

<?php
    include_once "./footer.html";
?>
</body>
</html>