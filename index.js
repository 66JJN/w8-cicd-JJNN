const http = require('http');

function createMessage(name = 'Cloud Student') {
  return `Hello, ${name}! CI/CD is working.`;
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(createMessage());
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = { createMessage };