//  Class Professional
export class Professional {
    constructor(name, age, weight, isRetired, nationality, oscarsNumber, profession) {
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.isRetired = isRetired;
        this.nationality = nationality;
        this.oscarsNumber = oscarsNumber;
        this.profession = profession;
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
