var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 8;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  groups: [{ 
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'Group' 
    }]
});

// TODO: save hashed user passwords
// autogenerate hashed pword
UserSchema.pre('save', function (next) {
  var user = this;

  // if pword is not new or modified, exit fcn
  if (!user.isModified('password')) {
    return;
  }

  // gen salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      next(err);
    }

    // hash password
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      // save hashed password + salt
      user.password = hash;
      user.salt = salt;
      next();
    })
  });
});

var User = mongoose.model('User', UserSchema);

module.exports = User;