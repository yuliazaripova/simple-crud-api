const { v4: uuidv4 } = require('uuid')
const { persons } = require('./db/persons')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(persons)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const person = persons.find(person => person.id === id)
        resolve(person)
    })
}

function createPerson(person) {
    return new Promise((resolve, reject) => {
        const newPerson = {...person, id: uuidv4()}
        persons.push(newPerson)
        resolve(newPerson)
    })
}

function updatePerson(id, person) {
    return new Promise((resolve, reject) => {
        const index = persons.findIndex(person => person.id === id)
        persons[index] = {id, ...person}
        persons.push(person)
        resolve(persons[index])
    })
}

function deletePerson(id) {
    return new Promise((resolve, reject) => {
        const index = persons.indexOf(id)
        persons.splice(index, 1)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    createPerson,
    updatePerson,
    deletePerson
}