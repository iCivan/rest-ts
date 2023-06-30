import HTTP from 'http';
import { getTasks, addTask, updateTask, deleteTask } from './controller'

const server = HTTP.createServer((req, res) => {
    if (req.url === 'api/tasks' && req.method === 'GET') {
        return getTasks(req, res)
    }

    if (req.url === 'api/tasks' && req.method === 'POST') {
        return addTask(req, res)
    }

    if (req.url === 'api/tasks' && req.method === 'PUT') {
        return updateTask(req, res)
    }

    if (req.url === 'api/tasks' && req.method === 'DELETE') {
        return deleteTask(req, res)
    }
})

server.listen(3000, () => {
    console.log('server is running on port 3000')
})

