#!/usr/bin/node
const request = require('request');

const url = process.argv[2];
const todoDict = {};

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const todosList = JSON.parse(body);

    for (const todo of todosList) {
      const userIds = todo.userId;
      const todoComplete = todo.completed;

      if (!todoDict[userIds]) {
        todoDict[userIds] = 0;
      }

      if (todoComplete === true) {
        todoDict[userIds]++;
      }
    }
    for (const userId in todoDict) {
      if (todoDict[userId] === 0) {
        delete todoDict[userId];
      }
    }

    console.log(todoDict);
  }
});
