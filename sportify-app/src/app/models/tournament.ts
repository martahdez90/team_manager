export class Tournament {
    public tournament_id: number
    public sport:string
    public date: string
    public location: string
    public category: string
    public description:string
    public team_id:number

    constructor( sport:string, date: string, description: string, category:string, location: string){
       
        this.date = date
        this.sport=sport
        this.location = location
        this.category = category
        this.description= description
    }
}
