export class Match {
    public match_id: number
    public date: string
    public location: string
    public comments: string
    public rival:string
    public team_id:number

    constructor(date: string, comments: string, rival:string, location: string){
       
        this.date = date
        this.location = location
        this.comments = comments
        this.rival= rival
    }
}