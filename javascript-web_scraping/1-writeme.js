#!/usr/bin/node
const fs = require('fs');

const filePath = process.argv[2];

const datas = 'Python is cool';

fs.writeFile(filePath, datas, 'utf8', (err) => {
  if (err) {
    console.error(err);
  }
});
