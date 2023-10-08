const http = require('http');
const countStudents = require('./3-read_file_async');

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  if (req.url === '/students') {
    countStudents('database.csv')
      .then((data) => {
        const response = `This is the list of our students\nNumber of students: ${data.totalStudents}\nNumber of students in CS: ${data.csStudentsCount}. List: ${data.csStudentsList.join(', ')}\nNumber of students in SWE: ${data.sweStudentsCount}. List: ${data.sweStudentsList.join(', ')}`;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(response);
      })
      .catch((error) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Internal Server Error: ${error.message}`);
      });
  } else if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
