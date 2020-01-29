const fs = require('fs');
const path = require('path');
const colors = require('colors');

const defaultPaths = {
  view: {
    jsPath: path.resolve('src/client/views'),
    jsIndexName: 'index.js',
    sassPath: path.resolve('src/client/scss/views'),
    sassIndexName: '_views.scss',
  },
  component: {
    jsPath: path.resolve('src/client/components'),
    jsIndexName: 'index.js',
    sassPath: path.resolve('src/client/scss/components'),
    sassIndexName: '_components.scss',
  },
};

// global
const exclusions = ['.DS_Store', 'index.js'];

function generateJsIndexes(types) {
  // pass array of types, like ['view', 'component'] etc
  types.forEach(type => {
    let arrOfLines = []; // push each line of index.js output file here
    let stringToWrite = '';

    fs.readdir(defaultPaths[type].jsPath, (err, files) => {
      // iterate through all files in directory
      files.forEach(filename => {
        if (!exclusions.includes(filename)) {
          // skip files that match a result in our exclusion array
          const moduleName = filename.replace(/\.[0-9a-z]{1,5}$/i, '');
          arrOfLines.push('export { default as ' + moduleName + " } from './" + moduleName + "';");
        }
      });
      arrOfLines.push('');
      stringToWrite = arrOfLines.join('\n');
      const fullPath = `${defaultPaths[type].jsPath}/${defaultPaths[type].jsIndexName}`;

      fs.writeFile(fullPath, stringToWrite, () => {
        console.log(colors.green('Generated module exports in ' + fullPath)); // eslint-disable-line no-console
      });
    });
  });
}

function generateSassIndexes(types) {
  // pass array of types, like ['view', 'component'] etc
  types.forEach(type => {
    let arrOfLines = []; // push each line of views/components.scss output file here
    let stringToWrite = '';

    fs.readdir(defaultPaths[type].sassPath, (err, files) => {
      // iterate through all files in directory
      files.forEach(filename => {
        if (!exclusions.includes(filename)) {
          // skip files that match a result in our exclusion array
          const importDir = defaultPaths[type].sassPath.split('/').pop(); // get 'views' or 'components' from full path
          arrOfLines.push(`@import '${importDir}/${filename}';`);
        }
      });
      arrOfLines.push('');
      stringToWrite = arrOfLines.join('\n');
      const fullPath = path.resolve('src/client/scss/') + '/' + defaultPaths[type].sassIndexName;

      fs.writeFile(fullPath, stringToWrite, () => {
        console.log(colors.green('Generated sass imports in ' + fullPath)); // eslint-disable-line no-console
      });
    });
  });
}

function generateAllIndexes() {
  generateJsIndexes(Object.keys(defaultPaths));
  generateSassIndexes(Object.keys(defaultPaths));
}

if (process.argv.indexOf('-all') !== -1) {
  // does our flag exist?
  generateAllIndexes();
}

module.exports = {
  generateAllIndexes,
  generateSassIndexes,
  generateJsIndexes,
  defaultPaths,
  exclusions,
};
