// implement your API here
const express = require('express')
const db = require('./data/db')

const server = express()

server.use(express.json())


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
    if (!id) {
        return (
            res.send({status: 404, message:{error: "User with ID does not exist"}})
        )
    }
    db
        .remove(id)
        .then(deleted => {
            if (id) {
                res.status(204).end()
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


server.listen(4000, () => {
    console.log(`\n*** Server Running on http://localhost:4000 ***\n`)
})