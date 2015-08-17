app
  .controller('loginCtrl', ['$scope', 'UserService', '$location', '$cookies', '$rootScope',
    function($scope, UserService, $location, $cookies, $rootScope) {

    $scope.login = function(){
      var user = {
        username: $scope.username,
        password: $scope.password
      };
      UserService.login(user).then(function(response){
        $cookies.put('user_id',response.data.user_id);
        $cookies.put('token',response.data.token);
        $rootScope.token = response.data.token;
        $location.path('/');
      });
    };

  }]);
