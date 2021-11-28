/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { persons } = require('./db/persons');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(persons);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const person = persons.find((person) => person.id === id);
    resolve(person);
  });
}

function createPerson(person) {
  return new Promise((resolve, reject) => {
    const newPerson = { ...person, id: uuidv4() };
    persons.push(newPerson);
    resolve(newPerson);
  });
}

function updatePerson(id, person) {
  return new Promise((resolve, reject) => {
    const index = persons.findIndex((person) => person.id === id);
    persons[index] = { id, ...person };
    resolve(persons[index]);
  });
}

function deletePerson(id) {
  return new Promise((resolve, reject) => {
    const index = persons.findIndex((i) => i.id === id);
    if (index > -1) {
      persons.splice(index, 1);
    }
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  createPerson,
  updatePerson,
  deletePerson,
};
