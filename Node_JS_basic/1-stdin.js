process.stdin.setEncoding('utf8');
console.log('Welcome to Holberton School, what is your name?');

process.stdin.on('data', (data) => {
    const name = data.trim();
    console.log(`Your name is: ${name}`);
    console.log('This important software is now closing');
    
    // Utilisez setTimeout pour laisser le temps au test de capturer l'entrée utilisateur
    setTimeout(() => {
        process.exit(0);
    }, 100);
});
