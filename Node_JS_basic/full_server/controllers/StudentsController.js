const readDatabase = require('../utils');

const databaseFilename = process.argv[2];

class StudentsController {
  static getAllStudents(request, response) {
    response.statusCode = 200;
    readDatabase(databaseFilename)
      .then((data) => {
        const fields = Object.keys(data)
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        const results = ['This is the list of our students'];
        fields.forEach((field) => {
          const studentsCount = data[field].length;
          const studentList = data[field].join(', ');
          results.push(`Number of students in ${field}: ${studentsCount}. List: ${studentList}`);
        });
        response.send(results.join('\n'));
      })
      .catch((error) => {
        response.status(500);
        response.send(`Cannot load the database: ${error.message}`);
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.statusCode = 500;
      response.setHeader('Content-Type', 'text/plain');
      response.end('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databaseFilename)
      .then((data) => {
        const studentsInMajor = data[major];

        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end(`List: ${studentsInMajor.join(', ')}`);
      })
      .catch((error) => {
        response.statusCode = 500;
        response.setHeader('Content-Type', 'text/plain');
        response.end(`Cannot load the database: ${error.message}`);
      });
  }
}

module.exports = StudentsController;
