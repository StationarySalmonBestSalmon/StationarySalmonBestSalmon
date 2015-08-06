var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  },
  event: { 
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'Event' 
    }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;


// {
//   "id": 1,
//   "creator": "user_id",
//   "content": "Some text",
//   "event": "event_id"
// }