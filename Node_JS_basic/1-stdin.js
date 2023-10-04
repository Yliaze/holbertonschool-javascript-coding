const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Welcome to Holberton School, what is your name?");

rl.on('line', (input) => {
    const name = input.trim();
    console.log(`Your name is: ${name}`);
    rl.close(); // Ferme l'interface readline
});

// Événement lorsque l'interface readline est fermée
rl.on('close', () => {
    console.log("This important software is now closing");
    process.exit(0);
});
