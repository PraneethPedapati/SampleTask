'use strict';

let server = require('../server');
let dataSource = server.dataSources.db;

let userDefinedModels = ['AppUser', 'Bank'];
console.log(dataSource);
dataSource.isActual(userDefinedModels, function(err, actual) {
  console.log(actual, '---actual');
  if (actual) {
    dataSource.autoupdate(userDefinedModels, function(err, result) {
      if (err) console.log(err);
      console.log('Datasource Synced: User defined models');
    });
  }
});

