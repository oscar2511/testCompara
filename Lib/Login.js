'use strict';

var _ = require('lodash');
var systemUser  = require('./User.js');
var sessionUser = require('./Session.js');

class Login {
  constructor(hash) {
    this.sessions = [];
    this.users    = [];

    Object.keys(hash)
      .map(u => ({
        u,p: hash[u]
      }))
      .map(user => {
        this.users.push(new systemUser(user.u, user.p))
      })
  }

  /**
   * Logout user session
   * @param  {String} user
   */
  logout(user) {
    var userSession = _.find(this.sessions, (se => {
      if(se.nameUser === user) {
        return se;
      }
    }));

    if(userSession && userSession != 'undefined') {
      console.log('Logout user: ' + userSession.nameUser);
      this.sessions = _.without(this.sessions, userSession);
    }
  }

  /**
   * Checks if user exists
   * @param  {String} user
   * @return {Object} User
   */
  userExists(user) {
    return _.find(this.users, (u => {
        if(u.name == user){
          return u;
        }
      }));
  }

  /**
   * Register an user
   * @param  {String} user
   * @param  {String} password
   */
  registerUser(user, password) {
    let userRegister = this.userExists(user);
    if(!userRegister)
      this.users.push(new systemUser(user, password));
    else {
      throw new Error('Username exists, please choose a different name');
    }
  }

  /**
   * Remove an user
   * @param  {String} user
   */
  removeUser(user) {
    let userToRemove = this.userExists(user);
    if(userToRemove && userToRemove !== 'undefined') {
      console.log('Delete user: ' + userToRemove.name);
      this.logout(userToRemove.name)
      this.users = _.without(this.users, userToRemove);
    }
  }

  /**
   * Update a user password
   * @param  {String} user
   * @param  {String} oldPassword
   * @param  {String} newPassword
   */
  updatePassword(user, oldPassword, newPassword) {
    let userFound = this.userExists(user);
    if(userFound && userFound !== 'undefined') {
      if(userFound.pass === oldPassword) {
        console.log("Successful updating password: " + user);
        userFound.pass = newPassword;
      } else console.log("Error updating user password: " + user);
    }
  }

  /**
   * User login
   * @param  {String} user
   * @param  {String} password
   */
  login(user, password) {
    let $ = this;
    var userFound =_.find(this.users, function(us) {
      if(us.name == user && us.pass == password) {
        $.sessions.push(new sessionUser(us.name));
        return us;
      }
    });
    if(userFound && userFound !== 'undefined')
      console.log('Successful user login: ' + userFound.name);
    else
      console.log('Error login user: ' + user);
  }

}

module.exports = Login;
