const Person = require('./personModel');
const { getPostData } = require('./utils');
const { isUUID, valideteObj } = require('./entities');
const { errorMessage } = require('./errors');

async function getPersons(req, res) {
  try {
    const persons = await Person.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(persons));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

async function getPerson(req, res, id) {
  try {
    if (!isUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    } else {
      const person = await Person.findById(id);
      if (!person) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Person with this id not found' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(person));
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

// eslint-disable-next-line consistent-return
async function createPerson(req, res) {
  try {
    const body = await getPostData(req);
    if (!body.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage.requiredFields }));
    } else {
      const person = JSON.parse(body);

      const isValid = valideteObj(person);

      if (!isValid) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: errorMessage.requiredFields }));
      } else {
        const newPerson = await Person.createPerson(person);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newPerson));
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

// eslint-disable-next-line consistent-return
async function updatePerson(req, res, id) {
  try {
    if (!isUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    } else {
      const person = await Person.findById(id);

      if (!person) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: errorMessage.idNotFound }));
      } else {
        const body = await getPostData(req);
        const newPerson = JSON.parse(body);
        const updPerson = await Person.updatePerson(id, { ...person, ...newPerson });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(updPerson));
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

async function deletePerson(req, res, id) {
  try {
    if (!isUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    } else {
      const person = await Person.findById(id);
      if (!person) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: errorMessage.idNotFound }));
      } else {
        await Person.deletePerson(id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage[500] }));
  }
}

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
