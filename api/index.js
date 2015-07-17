module.exports = {
    user: require('./user-route'),
    registration: require('./registration-route'),
    version: require('./version-route'),
    logging: require('./logging'),
    config: require('./common/config'),
    token: require('./token'),
    profile: require('./profile-route'),
};
