const bcrypt = require('bcrypt');

module.exports = {
  encrypt: (pass, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        return callback(hash);
      });
    });
  },
  compare: (pass, hash, callback) => {
    bcrypt.compare(pass, hash, (err, res) => {
      return callback(res);
    })
  }
}
