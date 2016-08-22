var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/toDoList';

router.get('/', function (req, res) {
  // Retrieve tasks from database
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM tasks', function (err, result) {
      done();

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var task = req.body;
  console.log("task", task);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO tasks (task, completed)'
                + 'VALUES ($1, $2)',
                [task.task, 'f'],
                function (err, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                  }

                  res.sendStatus(201);
                });
  });
});

router.put('/:id', function(req, res){
  var id = req.params.id;

    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        res.sendStatus(500);
      }

      client.query('UPDATE tasks' +
                  ' SET completed = $1' +
                  ' WHERE id = $2',
                  ['true', id],
              function (err, result){
                done();
                if (err) {
                  console.log('err', err);
                  res.sendStatus(500);
                } else {
                  res.sendStatus(200);
                }
      });
    });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM tasks ' +
                'WHERE id = $1',
                [id],
                function (error, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                    return;
                  }

                  res.sendStatus(200);
                });
  });
});

module.exports = router;
