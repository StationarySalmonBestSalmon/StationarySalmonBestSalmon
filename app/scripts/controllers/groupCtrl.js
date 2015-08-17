app
  .controller('groupCtrl', ['$scope', '$stateParams', '$cookies', '$window', 'ElectEventAPI',
    function ($scope, $stateParams, $cookies, $window, ElectEventAPI) {
      var contains = function (array, property, target) {
        for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
          if (array[i][property] === target) return true;
        }
        return false;
      };

      ElectEventAPI.getGroup($stateParams.id).then(function (response) {
        $scope.data = response.data;
        $scope.isInGroup = contains($scope.data.members, '_id', $cookies.get('user_id'));

        $scope.joinGroup = function () {
          ElectEventAPI.joinGroup($stateParams.id);
          $window.location.reload();
        };

      // Populate the creator field
      $scope.data.events.forEach(function(event){
        ElectEventAPI.getUser(event.creator).then(function(response){
          var user = response.data;
          event.userId = user._id;
          event.creator = user.username;
        });
      });
}]);
