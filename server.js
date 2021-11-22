const http = require('http');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./personController')

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
    if (req.url === '/person' && req.method === 'GET') {
       getPersons(req, res)
    } else if (req.url.match(/\/person\/([0-9]+)/) && req.method === 'GET') {
       const id = req.url.split('/')[2]
       getPerson(req, res, id)
    } else if (req.url === '/person' && req.method === 'POST') {
        createPerson(req, res)
    } else if (req.url.match(/\/person\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        updatePerson(req, res, id)
    } else if (req.url.match(/\/person\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        deletePerson(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: 'Route not found'}))
    }

})


server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})