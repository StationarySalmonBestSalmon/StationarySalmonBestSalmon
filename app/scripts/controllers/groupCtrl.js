app.
  controller('groupCtrl', ['$scope', '$stateParams', '$cookies', '$window', 'getGroups','UserService',
    function ($scope, $stateParams, $cookies, $window, getGroups, UserService) {

    var contains = function (array, property, target) {
      return array.reduce(function (prev, curr) {
        return prev ? prev : (curr[property] === target);
      }, false);
    };

    getGroups.getGroup($stateParams.id).then(function (response) {

      $scope.data = response.data;
      $scope.isInGroup = contains($scope.data.members, '_id', $cookies.get('user_id'));
      $scope.joinGroup = function () {
        getGroups.joinGroup($stateParams.id);
        $window.location.reload();
      };

      // Populate the creator field
      $scope.data.events.forEach(function(event){
        UserService.get(event.creator).then(function(response){
          var user = response.data;
          event.userId = user._id;
          event.creator = user.username;

        });
      });
    });
}]);
