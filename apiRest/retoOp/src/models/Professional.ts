//  Class Professional

export class Professional {

    public name:string
    public age:number
    public weight:number
    public isRetired:boolean
    public nationality:string
    public oscarsNumber:number
    public profession:string

    constructor (name:string, age:number, weight:number, isRetired:boolean, nationality:string, oscarsNumber:number, profession:string) {

        this.name = name
        this.age = age
        this.weight = weight
        this.isRetired = isRetired
        this.nationality = nationality
        this.oscarsNumber = oscarsNumber
        this.profession = profession

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