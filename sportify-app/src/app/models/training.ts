export class Training {
    public training_id: number
    public name: string
    public date: Date
    public location: string
    public description: string
    constructor (name: string, date: Date, location: string, description: string) {
        this.training_id;
        this.name = name;
        this.location = location;
        this.description = description;
   } 
}
