export class Match {
    public match_id: number
    public date: Date
    public location: string
    public comment: string

    constructor(date: Date, location: string, comment: string){
        this.match_id
        this.date = date
        this.location = location
        this.comment = comment
    }
}