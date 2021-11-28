const request = require('supertest');
const { errorMessage } = require('../errors');

const _request = request('http://localhost:4000');

describe('First scenario', () => {
  let id;
  it('GET should get an empty array', () => _request.get('/person')
    .then((res) => {
      expect(res.body).toStrictEqual([]);
    }));
  it('POST should get a created object and 201 status when create person', (done) => {
    _request
      .post('/person')
      .send({ name: 'john', age: 10, hobbies: [] })
      .set('Accept', 'application/json')
      .expect((res) => {
        id = res.body.id;
        res.body.id = 'id';
        res.body.name = 'john';
        res.body.age = 10;
        res.body.hobbies = [];
      })
      .expect(201, {
        id: "id",
        name: 'john',
        age: 10,
        hobbies: []
      }, done);
  });
  it('GET should get a object by id', (done) => {
    _request
      .get(`/person/${id}`)
      .expect(200, {
        id,
        name: 'john',
        age: 10,
        hobbies: []
      }, done);
  });
  it('PUT should update an object by id', (done) => {
    _request
      .put(`/person/${id}`)
      .send({ name: 'maria' })
      .set('Accept', 'application/json')
      .expect(200, {
        id,
        name: 'maria',
        age: 10,
        hobbies: []
      }, done);
  });
  it('DELETE should delete an object by id and return 204 status code', async () => {
    await _request
      .delete(`/person/${id}`)
      .expect(204)
      
  });
  it('GET should not get a object by id', (done) => {
    _request
      .get(`/person/${id}`)
      .expect(404, {
        message: 'Person with this id not found',
      }, done);
  });
  it('GET should get an empty array', () => _request.get('/person')
    .then((res) => {
      expect(res.body).toStrictEqual([]);
    }));
});


describe('Second scenario', () => {
  let id;
  it('user try to GET person by invalid endpoint and recieve 404', (done) => {
    _request
      .get('/persons')
      .expect(404, {
        message: errorMessage[404],
      }, done);
  });
  it('user fix address and GET an empty array', () => _request.get('/person')
    .then((res) => {
      expect(res.body).toStrictEqual([]);
    }));
  it('user POST a new person', (done) => {
    _request
      .post('/person')
      .send({ name: 'john', age: 10, hobbies: []})
      .set('Accept', 'application/json')
      .expect((res) => {
        id = res.body.id;
        res.body.id = 'id';
        res.body.name = 'john';
        res.body.age = 10;
        res.body.hobbies = [];
      
      })
      .expect(201, {
        id: 'id',
        name: 'john',
        age: 10,
        hobbies: []
      }, done);
  });
  it('user try to update created person with invalid id and get error', (done) => {
    _request
      .put(`/person/dbda113f-676f-4a6a-8daa-f8f0e5e48c8e`)
      .expect(404, {
        message: errorMessage.idNotFound,
      }, done);
  });
  it('PUT should update an object by valid id', (done) => {
    _request
      .put(`/person/${id}`)
      .send({ name: 'maria' })
      .set('Accept', 'application/json')
      .expect(200, {
        id,
        name: 'maria',
        age: 10,
        hobbies: []
      }, done);
  });
  it('DELETE should delete an object by id and return 204 status code', async () => {
    await _request
      .delete(`/person/${id}`)
      .expect(204)
      
  });
  it('GET should not get a object by id', (done) => {
    _request
      .get(`/person/${id}`)
      .expect(404, {
        message: 'Person with this id not found',
      }, done);
  });
});

describe('Third scenario', () => {
  let id;
  it('user POST a new person', (done) => {
    _request
      .post('/person')
      .send({ name: 'john', age: 10, hobbies: []})
      .set('Accept', 'application/json')
      .expect((res) => {
        id = res.body.id;
        res.body.id = 'id';
        res.body.name = 'john';
        res.body.age = 10;
        res.body.hobbies = [];
      })
      .expect(201, {
        id: 'id',
        name: 'john',
        age: 10,
        hobbies: []
      }, done);
  });
  it('user try to get person with not UUID id and get error', (done) => {
    _request
      .get(`/person/dbda113f-676f-4a6a-8daa-f8f0e5e48c8edd`)
      .expect(400, {
        message: errorMessage.idIsNotValid,
      }, done);
  });
  it('user try to update person with not UUID id and get error', (done) => {
    _request
      .put(`/person/dbda113f-676f-4a6a-8daa-f8f0e5e48c8edd`)
      .expect(400, {
        message: errorMessage.idIsNotValid,
      }, done);
  });
  it('user try to delete person with not UUID id and get error', (done) => {
    _request
      .delete(`/person/dbda113f-676f-4a6a-8daa-f8f0e5e48c8edd`)
      .expect(400, {
        message: errorMessage.idIsNotValid,
      }, done);
  });
  it('user fix id and PUT an object by valid id', (done) => {
    _request
      .put(`/person/${id}`)
      .send({ name: 'maria' })
      .set('Accept', 'application/json')
      .expect(200, {
        id,
        name: 'maria',
        age: 10,
        hobbies: []
      }, done);
  });
  it('user  GET an object by id', (done) => {
    _request
      .get(`/person/${id}`)
      .expect(200, {
        id,
        name: 'maria',
        age: 10,
        hobbies: []
      }, done);
  });
  it('DELETE should delete an object by id and return 204 status code', async () => {
    await _request
      .delete(`/person/${id}`)
      .expect(204)
      
  });
  it('GET should not get a object by id', (done) => {
    _request
      .get(`/person/${id}`)
      .expect(404, {
        message: 'Person with this id not found',
      }, done);
  });
});