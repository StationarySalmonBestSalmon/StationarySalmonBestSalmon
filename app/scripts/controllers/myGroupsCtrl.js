app
  .controller('myGroupsCtrl', ['$scope', '$location', '$cookies', 'ElectEventAPI',
    function ($scope, $location, $cookies, ElectEventAPI) {
      ElectEventAPI.getUser($cookies.get('user_id')).then(function(response) {
        var user = response.data;
        $scope.groups = user.groups;
      });
  }]);
