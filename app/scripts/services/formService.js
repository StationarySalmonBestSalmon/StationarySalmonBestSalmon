app.service('FormService', ['$http', function($http) {
  this.signup = function(user) {
    return $http.post('/api/users/signup', user)
      .then(function (response) {
        // on success
        console.log('successfully added user');
        return response.data;
      }, function (response) {
        // on failure
        console.log('failed to add user');
      });
  };
}]);