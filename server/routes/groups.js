var express     = require('express');
var router      = express.Router();
var Event       = require('./../db/Event');
var User        = require('./../db/User');
var Group       = require('./../db/Group');

// Return all events
router.get('/', function(req, res) {
  Group.find({}).populate('events').populate("members")
    .exec(function(err, events){
    res.json(events);
  }); 
});

// Expect a POST object like:
// {
//   "groupname": "Best Group",
//   "user_id": "55c3b0f7260e1c7acfa096ee"   // user_id is the id of group creator
// }

// 55c3b14b0ae922f4cfd97dac

// on group create, add that group id to the user's groups array property
router.post('/', function(req, res) {

  var data = req.body;

  var addGroup = Group.create({
    groupname: data.groupname,
    members: [data.user_id]
  },
  function(err, newGroup){
    // Add newGroup's id the the groups array on the User model
    User.findById(data.user_id, function(err, user){

      user.groups.push(newGroup._id);
      user.save(function(err){
        console.log("saved");
        // Respond with succesfully created group.
        res.send(newGroup);
      });
    });
  });
});

module.exports = router;