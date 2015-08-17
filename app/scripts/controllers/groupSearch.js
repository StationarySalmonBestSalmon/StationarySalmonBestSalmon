app.
  controller('groupSearch', ['$scope', 'ElectEventAPI', function ($scope, ElectEventAPI) {
    ElectEventAPI.getAllGroups().then(function (response) {
      $scope.groups = response.data;
    });
  }]);