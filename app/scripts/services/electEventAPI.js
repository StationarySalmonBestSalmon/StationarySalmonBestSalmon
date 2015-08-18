app
  .service('ElectEventAPI', ['$http', '$cookies', function ($http, $cookies) {

  // COMMENTS
  this.getComment = function (commentId) {
    return $http.get('api/comments/' + commentId);
  };

  this.postComment = function (comment) {
    return $http.post('api/comments/', comment);
  };

  // EVENTS
  this.getAllEvents = function () {
    return $http.get('/api/events');
  };

  this.getEvent = function (eventId) {
    return $http.get('api/events/' + eventId);
  };

  this.updateEvent = function (data) {
    return $http.put('api/events/', data);
  };

  this.postEvent = function (newEvent) {
    return $http.post('api/events/', newEvent)
      .then(function (response) {
        console.log('successfully added event');
        return response;
      }, function (response) {
        console.log('failed to add event');
      });
  };

  // AUTHENTICATION
  this.getUser = function (id) {
    return $http.get('/api/users/' + id);
  };

  this.login = function (user){
    return $http.post('/api/users/login', user);
  };

  this.signup = function (user) {
    return $http.post('/api/users/signup', user)
      .then(function (response) {
        console.log('successfully added user');
        return response.data;
      }, function (response) {
        console.log('failed to add user');
      });
  };

  // GROUPS
  this.getAllGroups = function () {
    return $http.get('/api/groups');
  };

  this.getGroup = function (id) {
    return $http.get('/api/groups/' + id);
  };

  this.joinGroup = function (id) {
    return $http.put('/api/groups/' + id, {_id: $cookies.get('user_id')});
  };

  this.postGroup = function (groupName, founderId) {
    return $http.post('api/groups/', {groupname: groupName, user_id: founderId})
      .then(function (response) {
        console.log('successfully added event');
        return response;
      }, function (response) {
        console.log('failed to add event');
      });;
  };

}]);