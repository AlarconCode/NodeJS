// class Movie
export class Movie {
    constructor(title, releaseYear, nationality, genre, actors, director, writers, language, platform, isMCU, mainCharacterName, producer, distributor) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.actors = actors;
        this.nationality = nationality;
        this.director = director;
        this.writers = writers;
        this.language = language;
        this.platform = platform;
        this.isMCU = isMCU;
        this.mainCharacterName = mainCharacterName;
        this.producer = producer;
        this.distributor = distributor;
        this.genre = genre;
    }
    // Methods
    printAll() {
        let allAttribute = '';
        for (let attribute in this) {
            if (this.hasOwnProperty(attribute)) {
                allAttribute += `
                ${attribute}: ${this[attribute]}`;
            }
        }
        return allAttribute;
    }
}
