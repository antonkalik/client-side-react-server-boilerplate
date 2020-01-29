const fs = require('fs');
const colors = require('colors');
const prompt = require('prompt');
const { defaultPaths, exclusions, generateAllIndexes } = require('./generate-indexes.js');

let readAllFiles = new Promise(resolve => {
  let arrOfAllFiles = [];

  Object.keys(defaultPaths).forEach(type => {
    let dirsToSearch = [defaultPaths[type].sassPath, defaultPaths[type].jsPath];
    dirsToSearch.forEach((dir, index) => {
      fs.readdir(dir, (err, files) => {
        // iterate through all files in directory
        files.forEach(filename => {
          if (!exclusions.includes(filename)) {
            // skip files that match a result in our exclusion array
            arrOfAllFiles.push({ filename, type, dir });
          }
          if (index === dirsToSearch.length - 1) {
            resolve(arrOfAllFiles);
          }
        });
      });
    });
  });
});

function searchForFiles(string, filesArr) {
  return filesArr.filter(fileObj => {
    return fileObj.filename.indexOf(string) > -1;
  });
}

readAllFiles.then(allFiles => {
  console.log('Delete Files Utility');

  const inputs = {
    properties: {
      filename: {
        description: `Search for filename to delete`,
      },
    },
  };

  const confirmInputs = {
    properties: {
      confirmation: {
        description: `Delete these files? y/n`,
      },
    },
  };

  prompt.start();

  prompt.get(inputs, (err, result) => {
    if (!result.filename) {
      console.log('You did not enter a search string...');
      return;
    }
    let foundFiles = searchForFiles(result.filename, allFiles);
    foundFiles.forEach(file => {
      console.log(file.filename);
    });
    // ask to confirm deletion of this list of files
    if (foundFiles.length > 0) {
      prompt.get(confirmInputs, (err, result) => {
        if (result.confirmation === 'y') {
          foundFiles.forEach(file => {
            fs.unlinkSync(`${file.dir}/${file.filename}`);
            console.log(colors.red(`- deleted`), `${file.filename}`);
          });

          console.log('\r\n');
          generateAllIndexes();
        } else {
          console.log('canceled');
        }
      });
    } else {
      console.log('Dod not find any files...');
    }
  });
});
