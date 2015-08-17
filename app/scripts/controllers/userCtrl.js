app
  .controller('userCtrl', ['$scope', '$stateParams', 'ElectEventAPI',
    function($scope, $stateParams, ElectEventAPI) { // removed $location
    ElectEventAPI.getUser($stateParams.id).then(function(response) { //changed from $cookies.get('user_id')
      var data = response.data;
      $scope.username = data.username;
      $scope.groups = data.groups;
    });
  }]);

