const fs = require('fs');
const path = require('path');
const colors = require('colors');
const prompt = require('prompt');
const { defaultPaths, generateSassIndexes, generateJsIndexes } = require('./generate-indexes.js');

// utility function for css ids
function convertToKebab(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// some parameters
const templatesPath = path.resolve('scripts/templates/');
const options = [
  {
    name: 'New View',
    type: 'view',
    jsTemplate: 'View.js',
    jsDestPath: path.resolve('src/client/views/'),
    sassTemplate: 'View.scss',
    sassDestPath: path.resolve('src/client/scss/views/'),
    required: true,
  },
  {
    name: 'New Component',
    type: 'component',
    jsTemplate: 'Component.js',
    jsDestPath: path.resolve('src/client/components/'),
    sassTemplate: 'Component.scss',
    sassDestPath: path.resolve('src/client/scss/components/'),
    required: true,
  },
];

//do the real work
function generateNew(templateIndex, fileName) {
  let generatedJsTemplate = new Promise((resolve, reject) => {
    const destFolder = defaultPaths[options[templateIndex].type].jsPath;
    const destPath = destFolder + '/' + fileName + '.js';

    const templatePath = templatesPath + '/' + options[templateIndex].jsTemplate;
    const templateString = fs.createReadStream(templatePath);

    fs.readFile(templatePath, 'utf8', (err, data) => {
      if (err) {
        reject();
        return console.log(err);
      }

      let result = data
        .replace(/ViewName/g, fileName)
        .replace(/viewname/g, convertToKebab(fileName));

      fs.writeFile(destPath, result, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log(colors.green('+ created '), `${fileName}.js`);

        resolve();
      });
    });
  });

  let generatedSassTemplate = new Promise((resolve, reject) => {
    const destFolder = defaultPaths[options[templateIndex].type].sassPath;
    const destPath = `${destFolder}/${fileName}.scss`;

    const templatePath = templatesPath + '/' + options[templateIndex].sassTemplate;
    const templateString = fs.createReadStream(templatePath);

    fs.readFile(templatePath, 'utf8', (err, data) => {
      if (err) {
        reject();
        return console.log(err);
      }

      let result = data.replace(/ViewName/g, convertToKebab(fileName));

      fs.writeFile(destPath, result, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log(colors.green('+ created '), `${fileName}.scss`);

        resolve();
      });
    });
  });

  Promise.all([generatedJsTemplate, generatedSassTemplate]).then(() => {
    console.log('\r\n');
    generateSassIndexes([options[templateIndex].type]);
    generateJsIndexes([options[templateIndex].type]);
  });
}

// prompt stuff
const inputs = {
  properties: {
    template: {
      description: `Choose template (0 - ${options.length - 1})`,
    },
    name: {
      description: 'Filename to use in PascalCase (without the .js file extension)',
    },
  },
};

function hasWhiteSpace(str) {
  return /\s/g.test(str);
}

prompt.start();

console.log('Please choose template type and filename');
options.forEach((option, index) => {
  console.log(`${index}) ${option.name}`);
});

prompt.get(inputs, (err, result) => {
  if (hasWhiteSpace(result.name)) {
    const names = result.name.split(' ').filter(it => it);
    console.log('generation many: ' + names);
    names.forEach(name => generateNew(result.template, name));
  } else {
    console.log('generation one: ' + result.name);
    generateNew(result.template, result.name);
  }
});
