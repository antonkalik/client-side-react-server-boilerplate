const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fileName = './package.json';
const file = require(path.resolve(fileName));

async function updatePackages({ dependencies, devDependencies }) {
  const log = message => console.log('\x1b[32m', '\x1b[1m', message);
  log('get dependencies...');
  const allDependencies = {
    dependencies: Object.keys(dependencies),
    devDependencies: Object.keys(devDependencies),
  };
  let data = JSON.stringify(allDependencies);

  log('saving to buffer...');
  let buffer = Buffer.from(data);

  let fileWithoutDependencies = file;

  log(`removing old packages versions from ${fileName}...`);
  delete fileWithoutDependencies.dependencies;
  delete fileWithoutDependencies.devDependencies;

  let fromBuffer = buffer.toString();

  log('wighting rest data...');
  fs.writeFile(fileName, JSON.stringify(fileWithoutDependencies), e => {
    if (e) {
      console.error('WRITE FILE ERROR', e);
    }
  });

  const stringOfListDependencies = JSON.parse(fromBuffer).dependencies.join(' ');
  const stringOfListDevDependencies = JSON.parse(fromBuffer).devDependencies.join(' ');

  try {
    log('removing node_modules...');
    await exec('rm -rf node_modules');
    log('node_modules removed!');
    log('installing new packages...');
    await exec('npm i -S ' + stringOfListDependencies);
    await exec('npm i -D ' + stringOfListDevDependencies);
    log(`Dependencies has been installed and ${fileName} has been updated!`);
  } catch (e) {
    console.error('EXEC ERROR', e);
  }
}

updatePackages(file);
