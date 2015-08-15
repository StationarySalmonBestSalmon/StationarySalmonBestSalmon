var express    = require('express');
var router     = express.Router();
var User       = require('./../db/User');
var Q          = require('q');
var jwt        = require('jwt-simple');

// Return users
router.get('/', function(req, res) {
  User.find({}).populate('groups')
  .exec(function(err, users){
    res.json(users);
  });

});


// Car
// .find()
// .populate('partIds')
// .exec(function(err, docs) {
//   if(err) return callback(err);
//   Car.populate(docs, {
//     path: 'partIds.otherIds',
//     model: 'Other'
//   },
//   function(err, cars) {
//     if(err) return callback(err);
//     console.log(cars); // This object should now be populated accordingly.
//   });
// });



// Return specific user by ID

router.get('/:id', function(req, res){
  var user_id = req.params.id;
  User.findById(user_id).populate('groups').populate('events')
  .exec(function(err, user){
    res.send(user);
  });
});

// Expect POST object like:
// {
//     "username": "andrew"
//     "password": cats
// }

// 55c3b0f7260e1c7acfa096ee

router.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var findOne = Q.nbind(User.findOne, User);

  // check if user exists
  findOne({username: username})
    .then(function(user) {
      if (user) {
        // if user exists throw error
        next(new Error('User already exists!'));
      } else {
        // else create user
        var create = Q.nbind(User.create, User);
        // set up user object
        var newUser = {
          username: username,
          password: password
        };
        // return created user
        return create(newUser);
      }
    })
    .then(function(user) {
      // send response for created user
      var token  = jwt.encode(user, 'stationarySalmon');
      res.send({token: token});
      next();
    })
    .fail(function (error) {
      next(error);
    });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var findOne = Q.nbind(User.findOne, User);

  findOne({username: username})
    .then(function(user) {
      if (!user) {
        next(new Error('User does not exist.'))
      } else {
        // return promise
        return user.comparePassword(password)
          .then(function(user) {
            if (user) {
              var token = jwt.encode(user, 'stationarySalmon');
              res.send({token: token});
            } else {
              next();
            }
          });
      }
    })
    .fail(function(err) {
      next(err);
    });


});


module.exports = router;
