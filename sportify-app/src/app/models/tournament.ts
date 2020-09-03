export class Tournament {
    public tournament_id: number
    public name: string
    public sport:string
    public date: string
    public category: string
    public description:string
    public location: string
    public team_id:number

    constructor( name:string, sport:string, date: string, category:string, description: string, location: string){
       
        this.name = name
        this.date = date
        this.sport=sport
        this.category = category
        this.description= description
        this.location = location
    }
}
