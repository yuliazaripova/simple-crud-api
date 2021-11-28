const { version, validate } = require('uuid');
const { errorMessage } = require('./errors');

const isUUID = (id) => validate(id) && version(id) === 4;

const valideteUUID = (id, res) => {
  if (!isUUID(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
  }
  return true;
};

// eslint-disable-next-line max-len
const valideteObj = (obj) => {
  if (typeof obj !== 'object') {
    return false;
  }
  return obj.age !== undefined && obj.name !== undefined && obj.hobbies !== undefined;
};

module.exports = {
  isUUID,
  valideteUUID,
  valideteObj,
};
