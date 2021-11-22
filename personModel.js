const persons = require('./db/persons.json')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('./utils')

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
        writeDataToFile('./db/persons.json', persons)
        resolve(newPerson)
    })
}

function updatePerson(id, person) {
    return new Promise((resolve, reject) => {
        const index = persons.findIndex(person => person.id === id)
        persons[index] = {id, ...person}
        writeDataToFile('./db/persons.json', persons)
        resolve(persons[index])
    })
}

function deletePerson(id) {
    return new Promise((resolve, reject) => {
        const _persons = persons.filter((person) => person.id !== id)
        writeDataToFile('./db/persons.json', _persons)
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