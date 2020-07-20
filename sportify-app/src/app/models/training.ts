export class Training {
    constructor(public trainin_id: number, public name: string, public date: Date, public location: string, public description: string) {
        this.trainin_id = trainin_id;
        this.name = name;
        this.location = location;
        this.description = description;
   } 
}
