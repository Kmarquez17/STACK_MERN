//Extraemos el modelo
const Task = require('../models/Tasks')

//Consultar todas las tareas
exports.findAllTasks = async (req, res) => {
    await Task.find()
        .exec()
        .then(tasks => {
            res.status(200).json({
                status: "success",
                message: "Tasks",
                data: tasks
            });
        })
        .catch(err => {
            res.status(500), json({
                error: err,
                message: 'Error in the request'
            })
        })
}

//Consultar una tarea
exports.findIdTask = async (req, res) => {
    //Obtenemos el ID a consultar
    let TaskID = req.params.id

    await Task.findById(TaskID)
        .exec()
        .then(task => {
            if (task) {
                res.status(200).json({
                    status: "success",
                    message: "Task",
                    data: task
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                res.status(404).json({
                    message: 'Task does not exist'
                })
            } else {
                res.status(500), json({
                    error: err,
                    message: 'Error in the request'
                })
            }

        })
}

//Guardar la tarea
exports.addTask = async (req, res) => {
    const {
        title,
        description
    } = req.body

    const task = new Task({
        title,
        description
    })

    await task.save()
        .then(task => {
            res.status(201).json({
                status: "success",
                message: "Task Created",
                data: task
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'Error in the request'
            })
        })
}

//Actualizar Tarea
exports.updateTask = async (req, res) => {
    const {
        title,
        description
    } = req.body;
    const newTask = {
        title,
        description
    };

    //Obtenemos el ID a consultar
    let TaskID = req.params.id

    await Task.findByIdAndUpdate(TaskID, newTask)
        .exec()
        .then(newTask => {
            if (newTask) {
                res.status(200).json({
                    status: "success",
                    message: "Task Updated",
                    data: newTask
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                res.status(404).json({
                    message: 'Task does not exist'
                })
            } else {
                res.status(500), json({
                    error: err,
                    message: 'Error in the request'
                })
            }

        })
}

//Eliminar tarea
exports.deleteTask = async (req, res) => {
    //Obtenemos el ID a consultar
    let TaskID = req.params.id

    await Task.findByIdAndRemove(TaskID)
        .exec()
        .then(task => {
            if (task) {
                res.status(200).json({
                    status: "success",
                    message: "Task Deleted",
                    data: task
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                res.status(404).json({
                    message: 'Task does not exist'
                })
            } else {
                res.status(500), json({
                    error: err,
                    message: 'Error in the request'
                })
            }

        })
}