app.controller('EventController', ['$scope', 'EventService', '$stateParams', function($scope, EventService, $stateParams) {
    EventService.get($stateParams.id).then(function(response) {    
      var data = response.data;
      $scope.eventName = data.title;
      $scope.group = data.group.groupname;
      $scope.creator = data.creator.username;
      $scope.eventDescription = data.description;
      $scope.votes = data.vote;
      $scope.comments = data.comments;
    });
  }]);