'use strict';

const logger = require('winston');
const LoginService = require('./services/login');

let registeredUsers = {
    user1: 'pass1',
    user2: 'pass2',
    user3: 'pass3'
};

let loginService = new LoginService(registeredUsers);

loginService.registerUser('user4', 'pass4');
loginService.login('user4', 'pass4');
loginService.updatePassword('user3', 'pass3', 'pass5');
loginService.login('user3', 'pass5');
loginService.logout('user4');
loginService.logout('user3');