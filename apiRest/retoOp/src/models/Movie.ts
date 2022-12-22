// class Movie

import { Professional } from "./Professional"

export class Movie {

    public idMovie:string
    public guidMovie:string
    public title:string
    public releaseYear:number
    public actors:Professional[]
    public nationality:string
    public director:Professional
    public writers:Professional[]
    public language:string
    public platform:string
    public isMCU:boolean
    public mainCharacterName:string
    public producer:string
    public distributor:string
    public genre:string

    constructor(idMovie:string, guidMovie:string, title:string, releaseYear:number, nationality:string, genre:string, actors:Professional[], director:Professional, writers:Professional[], language:string, platform:string, isMCU:boolean, mainCharacterName:string, producer:string, distributor:string) {

        this.idMovie = idMovie
        this.guidMovie = guidMovie
        this.title = title
        this.releaseYear = releaseYear
        this.actors = actors
        this.nationality = nationality
        this.director = director
        this.writers = writers
        this.language = language
        this.platform = platform
        this.isMCU = isMCU
        this.mainCharacterName = mainCharacterName
        this.producer = producer
        this.distributor = distributor
        this.genre = genre

    }

    // Methods

    printAll() {

        let allAttribute = ''
        for (let attribute in this) {

            if (this.hasOwnProperty(attribute)){

                allAttribute += `
                ${attribute}: ${this[attribute]}`
            
            }

        }

        return allAttribute

    }

}