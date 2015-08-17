app
  .controller('groupFormCtrl', ['$scope', '$cookies', '$location', 'ElectEventAPI', 
    function ($scope, $cookies, $location, ElectEventAPI) {
      $scope.submitForm = function (groupName) {
        ElectEventAPI.postGroup(groupName, $cookies.get('user_id')).then(function(response) {
          $scope.group.name = '';
          $location.path('/group/' + response.data._id);
        });
      }
  }]);
