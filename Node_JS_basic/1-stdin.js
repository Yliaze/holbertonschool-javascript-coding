process.stdin.setEncoding('utf8');
console.log('Welcome to Holberton School, what is your name?');

process.stdin.on('data', (data) => {
  const name = data.trim();
  // Show user name
  console.log(`Your name is: ${name}`);
  // closing message
  console.log('This important software is now closing');
  process.exit(0);
});
