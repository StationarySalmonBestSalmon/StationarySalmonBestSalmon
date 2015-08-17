app
  .controller('userCtrl', ['$scope', 'UserService', '$location', '$stateParams','$cookies',
    function($scope, UserService, $location, $stateParams, $cookies) {
    UserService.get($stateParams.id).then(function(response) { //changed from $cookies.get('user_id')
      var data = response.data;
      $scope.username = data.username;
      $scope.groups = data.groups;
    });
  }]);

