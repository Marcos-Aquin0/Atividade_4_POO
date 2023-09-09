import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const app = new App()
const bike = new Bike('caloi mountain', 'mountain bike', 100, 200, 150.5, 
    'My bike', 5, [])
const bikeId = app.registerBike(bike)
console.log(app.bikes)
const user1 = new User('Jose', 'jose@mail.com', '1234')
const user2 = new User('Maria', 'maria@mail.com', '1756')
// app.registerUser(user1)
// app.registerUser(user2)

console.log("Opção 0 -> signup")
console.log("Opção 1 -> login")

app.AutenticarUsuario(user1, 0)
app.AutenticarUsuario(user2, 0)

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const dayAfterTomorrow = new Date()
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 3)

app.AutenticarUsuario(user1, 0)
app.AutenticarUsuario(user1, 1, 'jose@mail.com', '1234')
app.AutenticarUsuario(user2, 1, 'mari@mail.com', '1675')

app.rentBike(bikeId, 'jose@mail.com', yesterday, today)

// console.log('Antes do retorno', app.rents)

app.returnBike(bikeId, 'jose@mail.com')

// console.log('Depois do retorno', app.rents)

console.log("\nListando usuarios: ")
app.listUsers()

console.log("\nListando bikes: ")
app.listBikes()

console.log("\nListando alugueis: ")
app.listRents()








