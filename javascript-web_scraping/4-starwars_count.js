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

    // Loop througt the list of films
    for (const movies of movieList) {
      const characters = movies.characters;
      // Look if Wedge Antilles is present in the film
      if (characters.includes('https://swapi-api.hbtn.io/api/people/18/')) {
        wedgeAntilles++;
      }
    }
    console.log(wedgeAntilles);
  }
});
