/**
 * prints msg to console
 * @param {string} message - msg to display
 */

const countStudents = (path) => {
    const fs = require('fs');
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            throw new Error('Cannot load the database');
        } else {
            let numStudents = 0;
            let names = [];
            
            const fileContent = fs.readFileSync(path, 'utf8');
            const line = fileContent.split('\n');

            for (let i = 0; i < line.length; i++) {
                if (line[i].length > 0) {
                    numStudents++;
                    var name = "";
                    for (let j = 0; j < line[i].length; j++) {
                        for (let k = 0; line[i][k] != ','; k++) {
                            if (line[i][k] == ',') {
                                break;
                            }
                            name += line[i][k];
                        }
                        
                        if (name != "") { names.push(name); }

                    }
                }
            }
            console.log(`Number of students: ${numStudents}`);
        }
    });
  };

  module.exports = countStudents;
