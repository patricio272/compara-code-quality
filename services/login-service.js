const logger = require('../config/logger-conf');

function LoginService(hash) {
    this.sessions = [];
    this.users = [];
    this.passwords = [];
    Object.keys(hash).map(k => ({k, v: hash[k]})).map(e => {
        this.users = this.users.concat([e.k]);
        this.passwords = this.passwords.concat([e.v]);
    });
    logger.log('debug', '[login-service]: DB Setup completed. Now running methods.');
}


// Utilitarian (private) Methods

// Checks if user exists
function userExists(user, userList) {
    let temp = '';
    for (let i of userList) {
        if (i === user) {
            temp = user;
            break;
        }
    }
    return (temp !== '' && temp === user);
}

function checkPassword(user, password, userList, passwordList) {
    let index = idx(user, userList);
    return passwordList[index] === password;
}

function renewPassword(user, newPassword, userList, passwordList) {
    let index = idx(user, userList);
    passwordList[index] = newPassword;
}

// Gets index of an element in an array
function idx(element, array) {
    let cont=0;
    for (let i of array) {
        if (i === element) {
            return cont;
        }
        cont += 1;
    }
    return cont;
}

// Exposed Methods
LoginService.prototype.logout = function (user) {
    this.sessions.forEach((session, i) => {
        if (session === user) {
            this.sessions[i] = null;
            logger.log('debug', '[login-service][logout]: User %s logged out', user);
        }
    });
    this.sessions = this.sessions.filter(session => session !== null);
};

// Register user
LoginService.prototype.registerUser = function (user, password) {
    if (!userExists(user, this.users)) {
        let lastIndex = this.users.length;
        this.users[lastIndex] = user;
        this.passwords[lastIndex] = password;
        logger.log('debug', '[login-service][registerUser]: User %s registered.', user);
        return true;
    }
    logger.log('debug', '[login-service][registerUser]: User %s is already registered.', user);
    return false;
};

LoginService.prototype.updatePassword = function (user, oldPassword, newPassword) {
    if (userExists(user, this.users)) {
        if (checkPassword(user, oldPassword, this.users, this.passwords)) {
            renewPassword(user, newPassword, this.users, this.passwords);
            logger.log('debug', '[login-service][updatePassword]: Update of user "%s" password successful', user);
            return true;
        }
    }
    logger.log('debug', '[login-service][updatePassword]: Update of user "%s" password failed', user);
    return false;
};

LoginService.prototype.login = function (user, password) {
    let index = idx(user, this.users);
    if (this.passwords[index] === password) {
        this.sessions.push(user);
        logger.log('debug', '[login-service][login]: User %s successfully logged in', user);
        return true;
    }
    logger.log('debug', '[login-service][login]: User %s login failed', user);
    return false;
};

module.exports = LoginService;