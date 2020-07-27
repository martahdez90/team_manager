export class Training {
    public training_id: number
    public team_id: number
   
    public name: string
    public date: string
    public location: string
    public description: string
    constructor (name: string, date: string, location: string, description: string,) {
        this.training_id;
        this.name = name;
        this.date = date
        this.location = location;
        this.description = description;
      
   } 
}
