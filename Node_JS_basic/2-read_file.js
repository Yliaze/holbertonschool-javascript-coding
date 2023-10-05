const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const students = [];
    const csStudents = [];
    const sweStudents = [];
    const listCS = [];
    const listSWE = [];
    let resultCS = '';
    let resultSWE = '';

    for (const line of lines.slice(1)) { // ignore first row
      const [firstName, lastName, age, field] = line.split(','); // Column
      const student = {
        firstName, lastName, age: parseInt(age, 10), field,
      }; // create object student

      students.push(student); // Add to array

      if (field === 'CS') {
        csStudents.push(student);
        listCS.push(student.firstName);
        resultCS = listCS.join(', ');
      } else if (field === 'SWE') {
        sweStudents.push(student);
        listSWE.push(student.firstName);
        resultSWE = listSWE.join(', ');
      }
    }
    console.log(`Number of students: ${students.length}`);
    console.log(`Number of students in CS: ${csStudents.length}. List: ${resultCS}`);
    console.log(`Number of students in SWE: ${sweStudents.length}. List: ${resultSWE}`);
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
