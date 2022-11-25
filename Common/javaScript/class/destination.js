class Destination {
    constructor(image, destination, offre, prix) {
        this.image = image;
        this.destination = destination;
        this.offre = offre;
        this.prix = prix;
    }

    // Exemple d'une destination (array)
    //[{"image":"espagne.jpeg","destination":"Espagne","offre":"Circuit plage, hôtel 4 *","prix":"800 €"}]

    get getDestination() {
        return this.dest
    }

    setAll(image, destination, offre, prix) {
        this.setImage(image);
        this.setDest(destination);
        this.setOffre(offre);
        this.setPrix(prix);
        this.setDestArray();
    }

    setDestArray() {
        this.dest = [{
            "image": this.image,
            "destination": this.destination,
            "offre": this.offre,
            "prix": this.prix
        }];
    }

    set setImage(image) {
        this.image = image;
        this.setDestArray();
    }

    set setDest(destination){
        this.destination = destination;
        this.setDestArray();
    }

    set setOffre(offre) {
        this.offre = offre;
        this.setDestArray();
    }

    set setPrix(prix) {
        this.prix = prix;
        this.setDestArray();
    }
}
