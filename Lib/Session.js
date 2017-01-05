'use strict';

class Session {

  constructor(nameUser) {
    this.nameUser   = nameUser;
    this.timeLogin  = new Date();
  }

}

module.exports = Session;
