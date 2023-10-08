const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

const databaseFilename = process.argv[2];

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(databaseFilename)
    .then((data) => {
      const response = `This is the list of our students\nNumber of students: ${data.totalStudents}\nNumber of students in CS: ${data.csStudentsCount}. List: ${data.csStudentsList.join(', ')}\nNumber of students in SWE: ${data.sweStudentsCount}. List: ${data.sweStudentsList.join(', ')}`;
      res.send(response);
    })
    .catch(() => {
      res.status(500).send('This is the list of our students\nCannot load the database');
    });
});

app.listen(1245);

module.exports = app;
