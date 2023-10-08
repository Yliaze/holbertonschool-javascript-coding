const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        // Divides the data string into an array of rows
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        // Browse each row in the lines array (map) and divide it into an array (split)
        const allData = lines.map((line) => line.split(','));
        // Cut header line
        const studentData = allData.slice(1);

        // Search right students
        const csStudents = studentData.filter((student) => student[3] === 'CS');
        const sweStudents = studentData.filter((student) => student[3] === 'SWE');

        // Search students names
        const csStudentsNames = csStudents.map((student) => student[0]);
        const sweStudentsNames = sweStudents.map((student) => student[0]);

        const result = {
          totalStudents: studentData.length,
          csStudentsCount: csStudents.length,
          csStudentsList: csStudentsNames,
          sweStudentsCount: sweStudents.length,
          sweStudentsList: sweStudentsNames,
        };

        console.log(`Number of students: ${studentData.length}`);
        console.log(`Number of students in CS: ${csStudents.length}. List: ${csStudentsNames.join(', ')}`);
        console.log(`Number of students in SWE: ${sweStudents.length}. List: ${sweStudentsNames.join(', ')}`);

        resolve(result);
      }
    });
  });
}

module.exports = countStudents;
