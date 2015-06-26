var debug = require('debug')('main');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
var q = require('q');

var common = require('../common');

var table = 'dt-user';

module.exports = {
    getMemberToken: getMemberToken
};

function getMemberToken(params) {
    var deferred = q.defer();
    debug('authentication.js', params);
    if (params.username == 'testuser' && params.password == 'password') {
        deferred.resolve({
            token: 'NzdlNzJkMWQtZWNlZS00MDk1LTk2OGEtMGI0MGZlZjE0NjNl.R1pebh06jMfupcMaluWA6eCjqQ0GfiO9hRbYi+3oLIa2A0RUbooUojWo+XqhqGuMONjQaBBp4X41qjqk9Ueqzy4rr1jb8iH4f3kR++kCU5r6lXsPd2hSh8EtwFclXUyh1pBQAqPCvTdhe+7kVYMzqqYx9SX6b/TMc4KbnA8xtMX5dOSk9oT3vAvCwM3CRGruA9rme/VgRii/QDogLJlcImDu8V2ubXcwnNPtK/9wOMFGPXy1b9SxzD6vLVhUWP662s3sJfjNgM83+2jinqwg2iQMUHXWGStx5NC2WX4DtCLEI/4Cijs0Q16jACh9zGYUUIWoVGo7p/nEtehTD7U1pQ=='
        });
    } else {
        deferred.reject({
            code: 'denied',
            description: 'Invalid credentials'
        });
    }
    return deferred.promise;
}

createUser({
    username: 'testuser',
    password: 'password'
});

function createUser(params) {

    if (params.password && params.username) {
        bcrypt.hash(params.password, 8, function(err, hash) {
            var item = {
                username: {
                    'S': params.username
                },
                customerId: {
                    'S': uuid.v4()
                },
                password: {
                    'S': hash
                },
                createDate: {
                    'S': new Date().toString()
                },
                updateDate: {
                    'S': new Date().toString()
                }
            };
            common.db.putItem(item, table);
        });
    }

}
