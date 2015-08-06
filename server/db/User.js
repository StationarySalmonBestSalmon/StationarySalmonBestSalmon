var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  groups: [{ 
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'Group' 
    }]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;