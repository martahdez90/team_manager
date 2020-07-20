enum Rol {
    coach = "coach",
    player = "player"
}

export class User {
    public rol: Rol;
    public password: string;
    public name: string;
    public lastName: string;
    public email: string;
    public phone: number;
    public userId: number;
    constructor(rol: Rol, password: string, name: string, lastName: string, email: string, phone: number, userId: number) {
        this.rol = rol;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.userId = userId;
    }
}

