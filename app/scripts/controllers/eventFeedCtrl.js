app
  .controller('eventFeedCtrl', ['$scope', '$location', '$cookies', '$q', 'ElectEventAPI',
    function($scope, $location, $cookies, $q, ElectEventAPI) {
    
    // Manually enter user-id for testing
    //UserService.get('55c5226057c77d1c3bf14540').then(function(response) {
    
    ElectEventAPI.getUser($cookies.get('user_id')).then(function(response) {
      var user = response.data;
      var groups = user.groups;
      var apiCalls = [];
      if(groups){
        groups.forEach(function(group){
          var events = group.events;
          if(events){
            events.forEach(function(event){
              apiCalls.push(ElectEventAPI.getEvent(event).then(function(result){
                result.data.groupSize = group.members.length;
                return result;
              }));
            });
            // Resolve all promises
            $q.all(apiCalls)
              .then(function(eventModels){
                $scope.events = eventModels.map(function(model){
                  return model.data;
                });
              });
          }
        });
      }
    });
  }]);
