app
  .controller('loginCtrl', ['$scope', '$location', '$cookies', '$rootScope', '$window', 'ElectEventAPI',
    function($scope, $location, $cookies, $rootScope, $window, ElectEventAPI) {
      $scope.login = function(){
        var user = {
          username: $scope.username,
          password: $scope.password
        };
        ElectEventAPI.login(user).then(function(response){
          $cookies.put('user_id',response.data.user_id);
          $cookies.put('token',response.data.token);
          $rootScope.token = response.data.token;
          $location.path('/');
          $window.location.reload();
        });
      };

  }]);
