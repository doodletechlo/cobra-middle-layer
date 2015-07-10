

function registerUser(params) {
    var deferred = q.defer();
    if (!params.username || !params.password) {
        deferred.reject({
            code: 'missingFields',
            description: 'Missing Fields'
        });
    } else {
        //q.all(user.db.check
        checkUsername(params.username).then(function() {
            profile.db.checkEmail(params.email).then(function() {
                putItem(params).then(function(val) {
                        params.customerId = val;
                        profile.db.createEntry(params);
                        deferred.resolve('User created');
                    },
                    function(err) {
                        deferred.reject({
                            code: 'dataError',
                            description: 'Database entry fail'
                        });
                    });
            }, function() {
                deferred.reject({
                    code: 'emailTaken',
                    description: 'Email Taken'
                });
            });

        }, function() {
            deferred.reject({
                code: 'usernameTaken',
                description: 'Username is taken'
            });
        });
    }
    return deferred.promise;
}

