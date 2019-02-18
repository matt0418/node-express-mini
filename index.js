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


server.listen(4000, () => {
    console.log(`\n*** Server Running on http://localhost:4000 ***\n`)
})