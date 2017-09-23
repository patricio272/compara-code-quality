'use strict';

const logger = require('./config/logger-conf');
const LoginService = require('./services/login-service');
const REGISTERED_USERS = require('./config/db/users');

logger.log('debug', '[app]: Starting app');
let loginService = new LoginService(REGISTERED_USERS);

loginService.registerUser('user4', 'pass4');
loginService.login('user4', 'pass4');
loginService.updatePassword('user3', 'pass3', 'pass5');
loginService.login('user3', 'pass5');
loginService.logout('user4');
loginService.logout('user3');