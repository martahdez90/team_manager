export class Match {
    public match_id: number
    public date: string
    public location: string
    public comments: string

    constructor(match_id: number,date: string, location: string, comments: string){
        this.match_id = match_id
        this.date = date
        this.location = location
        this.comments = comments
    }
}