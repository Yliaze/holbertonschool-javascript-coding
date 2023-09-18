#!/usr/bin/node
const request = require('request');

const url = process.argv[2];
const characterId = 18;
let wedgeAntilles = 0;

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const jsonBody = JSON.parse(body);
    const movieList = jsonBody.results;

    for (const movies of movieList) {
      const characters = movies.characters;
      if (characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
        wedgeAntilles++;
      }
    }
    console.log(wedgeAntilles);
  }
});
