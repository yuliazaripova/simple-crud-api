const http = require('http');
const dotenv = require('dotenv');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./personController')
const { METHOD } = require('./constants')


dotenv.config();

const PORT = Number(process.env.PORT) || 5000

const server = http.createServer((req, res) => {
    try {
        if (req.url === '/person' && req.method === METHOD.GET) {
            getPersons(req, res)
        } else if (req.url.match(/\/person\/([0-9]+)/) && req.method === METHOD.GET) {
            const id = req.url.split('/')[2]
            getPerson(req, res, id)
        } else if (req.url === '/person' && req.method === METHOD.POST) {
            createPerson(req, res)
        } else if (req.url.match(/\/person\/([0-9]+)/) && req.method === METHOD.PUT) {
            const id = req.url.split('/')[2]
            updatePerson(req, res, id)
        } else if (req.url.match(/\/person\/([0-9]+)/) && req.method === METHOD.DELETE) {
            const id = req.url.split('/')[2]
            deletePerson(req, res, id)
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'Route not found'}))
        }
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: 'Internal server error'}))
    }

})


server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})