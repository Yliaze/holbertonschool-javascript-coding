const http = require('http');
const url = require('url'); // Extract path from URL
const fs = require('fs').promises; // Promise version of fs

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse URL -> obj with properties
  const pathName = parsedUrl.pathname; // Pathname in the obj is the path

  if (pathName === '/students') {
    try {
      const data = await fs.readFile('database.csv', 'utf-8');
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const allData = lines.map((line) => line.split(','));
      const studentData = allData.slice(1);

      const csStudents = studentData.filter((student) => student[3] === 'CS');
      const sweStudents = studentData.filter((student) => student[3] === 'SWE');

      const csStudentsNames = csStudents.map((student) => student[0]);
      const sweStudentsNames = sweStudents.map((student) => student[0]);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`This is the list of our students\nNumber of students: ${studentData.length}
Number of students in CS: ${csStudents.length}. List: ${csStudentsNames.join(', ')}
Number of students in SWE: ${sweStudents.length}. List: ${sweStudentsNames.join(', ')}`);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Cannot load the database');
    }
  } else if (pathName === '/') {
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
