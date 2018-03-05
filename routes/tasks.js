var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://sachin:kabrugwy%402013@ds247058.mlab.com:47058/task-tracker', ['tasks'])

// Get all tasks
router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks) => {
        if (err) {
            res.send(err);
        } else {
            res.json(tasks);
        }
    });
});

// Get one task
router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

// Get one user's tasks
router.get('/tasks/user/:username', (req, res, next) => {
    db.tasks.find({username: req.params.username}, (err, task) => {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

// Create a task
router.post('/tasks', (req, res, next) => {
    var task = req.body;
    if (task.title && task.desc) {
        db.tasks.save(task, (err, task) => {
            if (err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    } else {
        res.json({
            "error": "Bad data"
        });
    }
});

// Delete a task
router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});

// Update a task
router.put('/tasks/:id', (req, res, next) => {
    var task = req.body;
    var changedTask = {};

    if (task.title && task.desc && task.username && task.timestamp) {
        changedTask.title = task.title;
        changedTask.desc = task.desc;
        changedTask.username = task.username;
        changedTask.timeStamp = task.timeStamp;
    }

    if (changedTask) {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, changedTask, {}, (err, task) => {
            if (err) {
                res.send(err);
            } else {
                res.json(task);
            }
        });
    } else {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    }
});

module.exports = router;