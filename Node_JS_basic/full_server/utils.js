const fs = require('fs').promises;

async function readDatabase(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    // Divides the data string into an array of rows
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const namesByField = {};

    lines.forEach((line) => {
      // Destructuring the array
      const [firstName, , , field] = line.split(',').map((value) => value.trim());

      if (field && (field === 'CS' || field === 'SWE')) {
        if (!namesByField[field]) {
          namesByField[field] = [];
        }
        namesByField[field].push(firstName);
      }
    });

    return namesByField;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = readDatabase;
