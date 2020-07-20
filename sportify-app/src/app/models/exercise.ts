enum TypeExercise {
    warmUp = "warmUp",
    main = "main",
    coolDown = "coolDown"
}

export class Exercise {
    constructor(public exercise_id: number, public name: string, public description: string, public url: string, public type: TypeExercise) {
        this.exercise_id = exercise_id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.type = type;
    }
}
