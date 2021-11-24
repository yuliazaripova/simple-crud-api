const isUUID = (id) => {
  const uuid = '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i';
  return typeof id === 'string' && id.match(uuid);
};

const PERSON_URL = '/person';

const isReqPersonById = (url) => url.match(/\/person\/([0-9]+)/);

const getIdByUrl = (url) => url.split('/')[2];

module.exports = {
  isUUID,
};
