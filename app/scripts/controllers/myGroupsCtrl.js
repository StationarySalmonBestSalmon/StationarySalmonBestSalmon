app
  .controller('myGroupsCtrl', ['$scope', '$location', '$cookies', 'ElectEventAPI',
    function ($scope, $location, $cookies, ElectEventAPI) {
    // Manually enter user-id for testing
    //UserService.get("55cd74f8289cf2d261678944").then(function(response) {

    ElectEventAPI.getUser($cookies.get('user_id')).then(function(response) {
      var user = response.data;
      $scope.groups = user.groups;
    });


  }]);
