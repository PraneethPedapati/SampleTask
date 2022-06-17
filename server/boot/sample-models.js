'use strict';

module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('AppUser', function(err) {
    if (err) throw err;

    app.models.AppUser.create([{
      name: 'Rahul',
      email: 'rahul@gmail.com',
      contactNo: 65645651,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      isActive: true,
    }, {
      name: 'Raheem',
      email: 'raheem@gmail.com',
      contactNo: 6568461556,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      isActive: true,
    }, {
      name: 'purush',
      email: 'purush@gmail.com',
      contactNo: 56484165,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      isActive: true,
    }], function(err, appUser) {
      if (err) throw err;

      console.log('Models created: \n', appUser);
    });
  });
};
