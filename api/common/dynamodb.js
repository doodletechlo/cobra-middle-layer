var AWS = require('aws-sdk');
var dataHelper= require('./dataHelper');
AWS.config.update({
    region: 'us-west-2'
});

var dynamodb = new AWS.DynamoDB();

module.exports = {
    read: read,
    create: create
};

function read(table) {
    var deferred = q.defer();
    var params = {
        TableName: table
    };
    db.scan(params, function(err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            dataHelper.removeKey(data.Items);
            deferred.resolve(data.Items);
        }
    });
    return deferred.promise;
}

function create(item, table) {
    debug('create: ' + JSON.stringify(data));
    var deferred = q.defer();

    db.putItem({
        TableName: table,
        Item: item
    }, function(err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }

    });
    return deferred.promise;
}
