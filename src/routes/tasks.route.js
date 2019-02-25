const express = require('express')
const router = express.Router()

const Task = require('../models/Tasks')

router.get('/', async (req, res) => {
    // const tasks = await Task.find()
    // res.json(tasks)

    await Task.find((err, tasks) => {
        if (err) res.send(500, 'Error in the request');
        res.status(200).json({
            status: "success",
            message: "Task Created",
            data: tasks
        });
    })
})

router.get('/:id', async (req, res) => {

    //Obtenemos el ID a consultar
    let TaskID = req.params.id

    // await Task.findById(TaskID, (err,task) => {
    //     if (err) return res.status(500).send({
    //         message: 'Error in the request'
    //      })
    //      if (!task) return res.status(404).send({
    //         message: 'Task does not exist'
    //      });

    //     res.status(200).json(task)
    // })

    await Task.findById(TaskID)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: 'Task does not exist'
                });
            }
            res.send(task);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Task does not exist'
                });
            }
            return res.status(500).send({
                message: 'Error in the request'
            });
        });


})

router.get('/:id', async (req, res) => {

    //Obtenemos el ID a consultar
    let TaskID = req.params.id

    await Task.findById(TaskID, (err, task) => {
        if (err) return res.status(500).send({
            message: 'Error in the request'
        })
        if (!task) return res.status(404).send({
            message: 'Task does not exist'
        });

        res.status(200).json(task)
    })

    // const tasks = await Task.findById(req.params.id)
    // res.json(tasks)
})


router.post('/', async (req, res) => {
    const {
        title,
        description
    } = req.body

    const task = new Task({
        title,
        description
    })
    await task.save((err) => {
        if (err) return res.status(500).send({
            message: 'Error in the request'
        })

        res.status(200).json({
            status: "success",
            message: "Task Created",
            data: task
        });
    })


})


//Update Task
router.put('/:id', async (req, res) => {
    const {
        title,
        description
    } = req.body;
    const newTask = {
        title,
        description
    }

    await Task.findByIdAndUpdate(req.params.id, newTask, (err, task) => {
        if (err) return res.status(500).send({
            message: 'Error in the request'
        })
        if (!task) return res.status(404).send({
            message: 'Task does not exist'
        });

        res.status(200).json({
            status: "success",
            message: "Task Updated",
            data: task
        });
    })

})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id, (err, task) => {
        if (err.kind) return res.status(500).send({
            message: 'Error in the request'
        })
        if (!task) return res.status(404).send({
            message: 'Task does not exist'
        });

        res.status(200).json({
            status: "success",
            message: "Task Deleted",
            data: task
        });
    })
})

module.exports = router