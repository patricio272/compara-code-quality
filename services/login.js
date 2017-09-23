function LoginService(hash) {
    this.sessions = [];
    this.users = [];
    this.passwords = [];
    Object.keys(hash).map(k => ({k, v: hash[k]})).map(e => {
        this.users = this.users.concat([e.k]);
        this.passwords = this.passwords.concat([e.v]);
    });
}


LoginService.prototype.logout = function (user) {
    this.sessions.forEach((session, i) => {
        if (session === user) {
            this.sessions[i] = null;
        }
    });
    this.sessions = this.sessions.filter(session => session !== null);
};

// Checks if user exists
function userExists(user) {
    // Temp variable for storing the user if found
    let temp = '';
    for (let i of this.users) {
        if (i === user) {
            temp = user;
        }
    }
    let exists = (temp !== '' && temp === user);
    return exists;
}

// Register user
LoginService.prototype.registerUser = function (user, password) {
    let lastIndex = this.users.length;
    this.users[lastIndex] = user;
    this.passwords[lastIndex] = password;
};

function removeUser(user) {
    let index = idx(user, this.users);
    this.users[index] = null;
    this.passwords[index] = null;
    this.users = this.users.filter(user => user !== null);
    this.passwords = this.passwords.filter(password => password !== null);
}

function checkPassword(user, password) {
    let index = idx(user, this.users);
    let passwordCorrect = this.passwords[index] === password;
    return passwordCorrect;
}

LoginService.prototype.updatePassword = function (user, oldPassword, newPassword) {
    // First we check if the user exists
    let user1 = '';
    for (let i of this.users) {
        if (i === user) {
            user1 = user;
        }
    }
    if (user1 === user) {
        let index = idx(user, this.users);
        if (this.passwords[index] === oldPassword) {
            this.passwords[index] = newPassword;
            return true;
        }
    }
    return false;
};

LoginService.prototype.login = function (user, password) {
    let index = idx(user, this.users);
    if (this.passwords[index] === password) {
        this.sessions.push(user);
    }
};

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

module.exports = LoginService;