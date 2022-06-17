'use strict';

    // Define API name
    // Purpose of the API - add a new user to the database
    // Define parameters required - name, email, contact
    // Validate parameters(throw error if required) - v
    // Write logic (find query to check email address exists)
    // Define data to return

module.exports = function(Appuser) {
  Appuser.createUser = (name, email, contactNo) => {
    return new Promise((resolve, reject) => {
      if (!name || typeof name !== 'string') {
        return reject('Invalid Name');
      }

      if (!email) return reject('Invalid Email');

      Appuser.find({where: {email: email}})
      .then(data => {
        if (data.length !== 0) {
          return reject('User Already Exists');
        };

        let newUser = {
          name: name,
          email: email,
          contactNo: contactNo,
          createdDate: new Date(),
          lastModifiedDate: new Date(),
          isActive: true,
        };
        return resolve(newUser);
      });
    })
    .then(data => {
      Appuser.create(data);
      return data;
    }).catch(err => {
      return err;
    });
  };

  Appuser.remoteMethod('createUser', {
    http: {
      path: '/CreateUser',
      verb: 'post',
    },
    accepts: [{
      arg: 'name',
      type: 'string',
    }, {
      arg: 'email',
      type: 'string',
    }, {
      arg: 'contactNo',
      type: 'number',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  Appuser.fetchUserDetails = (userId) => {
    return new Promise((resolve, reject) => {
      Appuser.findById(userId)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
  };

  Appuser.remoteMethod('fetchUserDetails', {
    http: {
      path: '/user',
      verb: 'get',
    },
    accepts: {
      arg: 'userId',
      type: 'number',
    },
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  Appuser.updateUserDetails = (userId, name, email) => {
    return new Promise((resolve, reject) => {
      let newName = name;
      let newEmail = email;

      Appuser.findById(userId)
      .then(data => {
        if (name === '') {
          newName = data.name;
        }
        if (email === '') {
          newEmail = data.email;
        }
      });
      Appuser.updateAll(
        {id: userId},
        {name: newName, email: newEmail, lastModifiedDate: new Date()})
    .then(() => {
      Appuser.findById(userId)
      .then(data => {
        return resolve(data);
      });
    })
    .catch(err => {
      reject(err);
    });
    }).then((data) => {
      return data;
    })
    .catch(err => {
      return err;
    });
  };

  Appuser.remoteMethod('updateUserDetails', {
    http: {
      path: '/UpdateUser',
      verb: 'put',
    },
    accepts: [{
      arg: 'userId',
      type: 'number',
    }, {
      arg: 'name',
      type: 'string',
    }, {
      arg: 'email',
      type: 'string',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  Appuser.removeUser = (userId) => {
    return new Promise((resolve, reject) => {
      Appuser.updateAll(
        {id: userId}, {lastModifiedDate: new Date(), isActive: false})
    .then(() => {
      Appuser.findById(userId)
      .then(data => {
        return resolve(data);
      });
    })
    .catch(err => {
      reject(err);
    });
    }).then((data) => {
      return data;
    })
    .catch(err => {
      return err;
    });
  };

  Appuser.remoteMethod('removeUser', {
    http: {
      path: '/DeleteUser',
      verb: 'put',
    },
    accepts: {
      arg: 'userId',
      type: 'number',
    },
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });
};
