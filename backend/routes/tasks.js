const express = require('express')
const Task = require('../models/tasks')

const router = express.Router()


// GET all tasks
router.get('/', (req, res) => {
    res.json({msg: 'GET all tasks'})
})

//GET a single task
router.get('/:id', (req, res) => {
    res.json({msh: 'Get a single task'})
})

//POST a new task
router.post('/', async (req, res) => {
    console.log(req.body);
    const {title, description, date} = req.body;
    try {
        console.log(req.body)
        const task = await Task.create({title, description, date})
        res.status(200).json(task)
    } catch(error) {
        res.status(400).json({error: error})
    }
})

//POST a new task

//exporting the routes
module.exports = router