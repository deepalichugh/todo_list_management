const express = require('express')
const { createTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById } = require('../controllers/taskController')

const router = express.Router()


// GET all tasks
router.get('/', getAllTasks)

//GET a single task
router.get('/:id', getTaskById)

//POST a new task
router.post('/', createTask)

//Delete a task
router.delete('/:id', deleteTaskById)

//Update a task
router.patch('/:id', updateTaskById)

//exporting the routes
module.exports = router