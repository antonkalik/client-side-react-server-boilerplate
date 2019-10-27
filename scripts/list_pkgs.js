const { dependencies = {}, devDependencies = {} } = require('../package.json');

function list_pkgs(packages, dev) {
  let str = packages.join(' ');
  if (dev) {
    console.log('devDependencies: ', str);
  } else {
    console.log('dependencies: ', str);
  }
}

list_pkgs(Object.keys(dependencies));
list_pkgs(Object.keys(devDependencies), 'dev');
