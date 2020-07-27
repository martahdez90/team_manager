export class Exercise {
    public exercise_id: number
    public name: string
    public description: string
    public url: string
    public type: string
    public training_id:number

    constructor (name: string, description: string, url: string, type: string) {
        this.exercise_id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.type = type;
    }
}
