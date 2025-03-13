const Task = require('../models/tasks')
const mongoose = require('mongoose')

//create a new task
const createTask = async (req, res) => {
    const {title, description, date} = req.body
    // add document to the database
    try {
        const task = Task.create({title, description, date})
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({msg: err})
    }
}

// get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({date: -1})
        res.status(200).json(tasks)
    } catch(error) {
        res.status(400).json({error: error})
    }
}

// get a task by ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such workout'})
        }

        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({error: 'No such task found'})
        }
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({msg: err})
    }
}

//delete a task by ID
const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No task with this ID found'})
        }

        const task = await Task.findOneAndDelete({_id: id})
        if (!task) {
            return res.status(404).json({error: 'No task with this ID found'})
        }
        res.status(200).json({msg: `Task deleted successfully: ${task}`})

    } catch (err) {
        res.status(404).json({err: 'Task could not be deleted'})
    }
}

const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const {title, description, date} = req.body
        console.log(title, description, date)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({msg: 'No such task with the given id found'})
        }
        const task = await Task.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(task)
    } catch (err) {
        res.status(404).json({error: err})
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    deleteTaskById,
    updateTaskById
}