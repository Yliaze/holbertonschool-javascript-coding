#!/usr/bin/node
const request = require('request');

const url = process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const jsonBody = JSON.parse(body);
    const movieList = jsonBody.results;

    let wedgeAntilles = 0;

    for (const movie of movieList) {
      const characters = movie.characters;
      for (const characterURL of characters) {
        if (characterURL.includes('/18/')) {
          wedgeAntilles++;
        }
      }
    }
    console.log(wedgeAntilles);
  }
});
