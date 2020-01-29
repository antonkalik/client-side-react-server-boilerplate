const { dependencies = {}, devDependencies = {} } = require('../package.json');

function list(packages) {
  packages.forEach((it, i) => {
    console.log('\x1b[32m', '\x1b[1m', `${i > 0 ? 'DEV_' : ''}DEPENDENCIES: `);
    console.log('\x1b[22m', '\x1b[34m', Object.keys(it).join(' '));
    console.log('\x1b[0m', '');
  });
}

list([dependencies, devDependencies]);
