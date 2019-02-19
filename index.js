// implement your API here
const express = require('express')
const cors = require('cors')
const db = require('./data/db')

const server = express()

server.use(express.json())

server.use(cors())


server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(({message}) => {
            res.status(500).json({
                success: false,
                message: { error: "The users information could not be retrieved"}
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id =req.params.id
    db
        .findById(id)
        .then(user => {
            if (user) {
                res.status(200).json({success: true, user})
            } else {
                res.status(404).json({ success: false, message: {error: "The user with the specified ID does not exist"}})
            }
            
        })
        .catch(({message}) => {
            res.status(500).json({
                success: false,
                message: { error: "The user informtation could not be retrieved"}
            })
        })

})

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body
    if ( !name || !bio ) {
        return(
            res.send({status: 200, message: {error: "Provide bio and name"}})
        )
    }
    db
        .insert({name, bio})
        .then(user => {
            res.status(201).json({ success: true, user })
        })
        .catch(() => {
            res.status(500).json({
                success: false,
                message: {error: "There was an error while saving user"}
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    db
        .remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ success: true, message: {deleted: `number of items deleted ${deleted}`}})
            } else {
                res.status(404).json({ success: false, message: {error: "The user with the specified ID does not exist"}})
            }
        })
        .catch(() => {
            res.status(500).json({
                success: false,
                message: {error: "The user could not be removed"}
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const {name, bio} = req.body
    if (!name || !bio) {
        res.send({status: 400, message: {error: "Please provide name and bio"}})
    }
    db
    .update(id, {name, bio})
    .then(updated => {
        if (updated) {
            res.status(200).json({success: true, updated})
        } else {
            res.status(404).json({success: false, message: "The user with the specified ID does not exist"})
        }
    })
    .catch(() => {
        res.status(500).json({
            success: false,
            message: {error: "The information could not be modified"}
        })
    })
})


server.listen(4000, () => {
    console.log(`\n*** Server Running on http://localhost:4000 ***\n`)
})