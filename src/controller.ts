import fs from 'fs'
import path from 'path'

import { ServerResponse, IncomingMessage } from 'http'

import { Task } from './ITask'

const getTasks = (req: IncomingMessage, res: ServerResponse) => {
    return fs.readFile(path.join(__dirname, 'store.json'), 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: err }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: true, data: JSON.parse(data) }))
        }
    })
}

const addTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = ""
    req.on('data', (chunk) => {
        data += chunk.toString()
    })
    req.on('end', () => {
        let task = JSON.parse(data)

        fs.readFile(path.join(__dirname, 'store.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: false, error: err }))
            } else {
                let tasks: Task[] = JSON.parse(data)
                let latest_id = tasks.reduce((max = 0, task: Task) => (task.id > max ? task.id : max), 0)
                task.id = latest_id + 1
                tasks.push(task)
                fs.writeFile(path.join(__dirname, 'store.json'), JSON.stringify(tasks), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ success: false, error: err }))
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ success: true, message: task }))
                    }
                })
            }
        })
    })
}

const updateTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = ""
    req.on('data', (chunk) => {
        data += chunk.toString()
    })
    req.on('end', () => {
        let task: Task = JSON.parse(data)
        fs.readFile(path.join(__dirname, 'store.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: false, error: err }))
            } else {
                let tasks: [Task] = JSON.parse(data)
                let index = tasks.findIndex((t) => t.id === task.id)
                tasks[index] = task
                fs.writeFile(path.join(__dirname, 'store.json'), JSON.stringify(tasks), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ success: false, error: err }))
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ success: true, message: task }))
                    }
                })
            }
        })
    })
}

const deleteTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = ""
    req.on('data', (chunk) => {
        data += chunk.toString()
    })
    req.on('end', () => {
        let task: Task = JSON.parse(data)
        fs.readFile(path.join(__dirname, 'store.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: false, error: err }))
            } else {
                let tasks: [Task] = JSON.parse(data)
                let index = tasks.findIndex((t) => t.id === task.id)
                tasks.splice(index, 1)
                fs.writeFile(path.join(__dirname, 'store.json'), JSON.stringify(tasks), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ success: false, error: err }))
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ success: true, message: task }))
                    }
                })
            }
        })
    })
}

export { getTasks, addTask, updateTask, deleteTask }
