const http = require('http');
const fs = require('fs').promises;

const PORT = 1245;
const HOST = 'localhost';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 */
const countStudents = async (dataPath) => {
  try {
    const stats = await fs.stat(dataPath);
    if (!stats.isFile()) {
      throw new Error('Cannot load the database');
    }
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    const fileLines = fileContent.trim().split('\n');

    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];
      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }
      const studentEntries = studentPropNames
        .map((propName, idx) => [propName, studentPropValues[idx]]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    const totalStudents = Object
      .values(studentGroups)
      .reduce((pre, cur) => (pre || []).length + cur.length);
    return `Number of students: ${totalStudents}\n${
      Object.entries(studentGroups)
        .map(([field, group]) => `Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`)
        .join('\n')}`;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(process.argv[2])
      .then((output) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`This is the list of our students\n${output}`);
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
