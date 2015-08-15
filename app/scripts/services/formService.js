app.service('FormService', ['$http', function($http) {
  this.signup = function(user) {
    return $http.post('/api/users/signup', user)
      .then(function (response) {
        // on success
        console.log('successfully added user');
        return response.data.token;
      }, function (response) {
        // on failure
        console.log('failed to add user');
      });
  };
}]);