// const person = { 
//     name: 'Lydia'
// }
 
// const sayHi = (age) => {
//   return `${this.name} is ${age}`
// }
 
// console.log(sayHi.call(person, 21))
// console.log(sayHi.bind(person, 21))


const person = { name: "Lydia", age: 21 }
const changeAge = (x = { ...person }) => x.age += 1
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1
  x.name = "Sarah"
}
 
changeAge(person) // 22
changeAgeAndName() // Sarah + 22
 
console.log(person)  //name : Lydia 21