const http = require('http');
const countStudents = require('./3-read_file_async');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(process.argv[2])
      .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('This is the list of our students\n' + process.stdout.read());
      })
      .catch((err) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end(err.message);
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});

module.exports = app;