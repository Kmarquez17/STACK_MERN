const express = require('express')
const tasks = express.Router()
const TasksCtrl = require('../controllers/TasksControllers')

//Routes
tasks.route('/tasks')
    .get(TasksCtrl.findAllTasks)
    .post(TasksCtrl.addTask)

tasks.route('/tasks/:id')
    .get(TasksCtrl.findIdTask)
    .put(TasksCtrl.updateTask)
    .delete(TasksCtrl.deleteTask)

module.exports = tasks