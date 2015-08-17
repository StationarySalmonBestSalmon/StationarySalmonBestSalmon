app.controller('FormCtrl', ['$scope', '$location', '$cookies', '$rootScope', '$window', 'ElectEventAPI',
  function($scope, $location, $cookies, $rootScope, $window, ElectEventAPI) {
  $scope.user = {};
  $scope.signup = function() {
    var user = $scope.user;
    ElectEventAPI.signup(user).then(function(data) {
      $cookies.put('token', data.token);
      //$cookies.put('user', $scope.user.username);
      $cookies.put('user_id', data.user_id);
      $rootScope.token = data.token;
      $location.path('/');
      $window.location.reload();
    });
  };
}]);
