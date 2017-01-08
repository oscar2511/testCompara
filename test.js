'use strict';

var Login  = require('./Lib/Login.js');


let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

let login = new Login(registeredUsers);

console.log('Initiating process...')

setTimeout(function () {
  login.registerUser('user4', 'pass4');
  login.login('user4', 'pass4');
  login.updatePassword('user3', 'pass3', 'pass5');
  login.login('user3', 'pass5');
}, 2000);

setTimeout(function () {
  console.log('Actives sessions:')
  console.log(login.sessions);
}, 4000)

setTimeout(function () {
  login.logout('user4');
  login.logout('user3');
  console.log('Finished process!');
}, 6000)
