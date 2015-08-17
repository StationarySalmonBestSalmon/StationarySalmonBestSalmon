app
  .controller('eventFeedCtrl', ['$scope', '$location', '$cookies', '$q', 'ElectEventAPI',
    function($scope, $location, $cookies, $q, ElectEventAPI) {
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
