const Person = require('./personModel')
const { getPostData } = require('./utils')


async function getPersons(req, res) {
    try {
        const persons = await Person.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify(persons))
    } catch (error) {
        console.log(error)
    }
}

async function getPerson(req, res, id) {
    try {
        const person = await Person.findById(id)
        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Person with this id not found'}))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify(person))
        }

    } catch (error) {
        console.log(error)
    }
}

async function createPerson(req, res) {
    try {
        const body =  await getPostData(req)
        const person = JSON.parse(body)
        const newPerson = await Person.createPerson(person)

        res.writeHead(201, { 'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newPerson))
       
    } catch (error) {
        console.log(error)
    }
}

async function updatePerson(req, res, id) {
    try {
        const person = await Person.findById(id)

        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'Person with this id not found'})) 
        } else {
            const body =  await getPostData(req)
            const newPerson = JSON.parse(body)
            const updPerson = await Person.updatePerson(id, { ...person, ...newPerson })
    
            res.writeHead(200, { 'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updPerson))

        }
       
    } catch (error) {
        console.log(error)
    }
}

async function  deletePerson(req, res, id) {
    try {
        const person = await Person.findById(id)
        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Person with this id not found'}))
        } else {
            await Person.deletePerson(id)
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Person with ${id} deleted`}))
        }

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}