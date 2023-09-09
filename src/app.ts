import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    AutenticarUsuario(user: User, help: number, email?: string, password?: string): string | void {
        //help = 1 - login; = 0 - signup
        if(!help){
            return this.SignUp(user)
        }
        else {
            return this.LogIn(user, email, password)
        }
    }

    SignUp(user: User): string | void{
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                // throw new Error('Duplicate user. Please use another email or log in')
                console.log('Duplicate user. Please use another email or log in')
                return 
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        console.log ('Usuario ' + user.name + ' cadastrado')
        return newId
    }

    LogIn(user: User, email: string, password: string){
        for (const rUser of this.users) {
            if (email === user.email) {
                if(password === user.password)
                    console.log ("Usuario autenticado")
                    return
            }
        }
        // throw new Error('Tente novamente. Email e/ou senha incorretos')
        console.log('Tente novamente. Email e/ou senha incorretos')
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const bikeRents = this.rents.filter(rent =>
            rent.bike.id === bikeId && !rent.dateReturned
        )
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string) {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )
        if (rent) {
            rent.dateReturned = today
            return
        }
        throw new Error('Rent not found.')
    }

    listUsers() : void{
        let a = 0
        for (const rUser of this.users) {
            a +=1
            console.log("Nº", a, rUser)
        }
    }

    listBikes() : void{
        let a = 0
        for (const rBike of this.bikes) {
            a +=1
            console.log("Nº", a, rBike)
        }
    }

    listRents() : void{
        let a = 0
        for (const rRent of this.rents) {
            a +=1
            console.log("Nº", a, rRent)
        }
    }
}