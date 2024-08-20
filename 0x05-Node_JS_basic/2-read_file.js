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
                if (line[i].length > 0 && line[i].split(',')[0] != "firstname") {
                    numStudents++;
                    var name = line[i].split(',')[0];
                    var major = line[i].split(',')[3];
                    const dict = `{name: ${name}, major: ${major}}`;
                    names.push(dict);
                }
            }
            var MajorNum = 0;
            var cName, cMajor;
            var cNames, cMajors = 0;
            var cMajorsNames = [];
            already = [];
            output = [];

            already1 = [];
            var cMajor1;
            for (let i = 0; i < names.length; i++) {
                cMajor1 = names[i].split(',')[1].slice(8, -1);
                if (!already.includes(cMajor1)) {
                    already1.push(cMajor1);
                    MajorNum++;
                }
            }
            
            for (let i = 0; i < names.length; i++) {
                cName = names[i].slice(7, -1).split(',')[0];
                cMajor = names[i].split(',')[1].slice(8, -1);
                cMajors = 0;
                cMajorsNames = [];

                if (!already.includes(cMajor)) {
                    already.push(cMajor);
                } else {
                    cMajors++;
                    cMajorsNames.push(cName);
                }
                const dict = `{major: ${cMajor}, num: ${cMajors}, people: ${cMajorsNames}}`;
                output.push(dict);
            }
            console.log(`Number of students: ${numStudents}`);
            console.log(output);

            // console.log(cMajors);
            // console.log('Number of students in CS')
        }
    });
  };

  module.exports = countStudents;
