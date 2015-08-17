app
  .controller('LogoutCtrl', ['$scope','$cookies','$location', '$rootScope',
   function ($scope, $cookies, $location, $rootScope) {
    $scope.logout = function() {
      // Delete session information
      $cookies.remove('token');
      $cookies.remove('user_id');
      $cookies.remove('user');
      $rootScope.token = undefined;
      $location.path('/login');
    };
    $scope.logout();
  }]);
