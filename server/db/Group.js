var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true
  },
  events: [{ 
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'Event' 
    }],
  members: [{ 
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }]
});

var Group = mongoose.model('Group', GroupSchema);

module.exports = Group;


// {
//   "id": 1,
//   "groupname": "Best Group",
//   "events": ["event_id1", "event_id2"],
//   "members": ["user_id1", "user_id2"]
// }