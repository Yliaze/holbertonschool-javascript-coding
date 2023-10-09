const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        // Divides the data string into an array of rows
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        // Find the header
        const header = lines[0].split(',');
        // Browse each row in the lines array (map) and divide it into an array (split)
        const studentData = lines.slice(1).map((line) => {
          // Divide rows into an array (split)
          const values = line.split(',');

          const student = {};
          // Create students objects with keys/values
          header.forEach((field, index) => {
            student[field] = values[index].trim();
          });
          return student;
        });

        // Extract first names per field
        const fieldFirstNames = {};
        header.forEach((field) => {
          fieldFirstNames[field] = studentData.map((student) => student[field]);
        });

        resolve(fieldFirstNames);
      }
    });
  });
}

module.exports = readDatabase;
