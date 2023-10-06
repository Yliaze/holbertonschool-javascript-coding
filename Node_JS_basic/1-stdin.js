// Affiche le message de bienvenue
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Écoute les entrées utilisateur
process.stdin.on('readable', () => {
  // Lit l'entrée utilisateur
  const input = process.stdin.read();
  if (input !== null) process.stdout.write(`Your name is: ${input}`);
});

// Gère la fin de l'entrée utilisateur
process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
