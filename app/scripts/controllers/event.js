app
  .controller('EventController', ['$scope', '$stateParams','$cookies', 'ElectEventAPI',
  function($scope, $stateParams, $cookies, ElectEventAPI) {
    var populateEventData = function(){
      ElectEventAPI.getEvent($stateParams.id).then(function(response) {
        var data = response.data;
        data.groupSize = data.group.members.length;
        $scope.data = data;
        $scope.event = data;
        $scope.user_id = $cookies.get('user_id');

      })
      .then(function(){
        $scope.event.comments.forEach(function(comment){
          ElectEventAPI.getUser(comment.creator).then(function(response){
            comment.creator = response.data.username;
          });
        });
      });

      setTimeout(function () {console.log($scope.event)}, 2000);
    };

    $scope.postComment = function(){
      var event_id = $stateParams.id;
      var comment_text = $scope.comment_text;

      // Don't submit unless the user has actually written a comment
      if(comment_text){
        var comment = {
          "content": comment_text,
          "user_id": $scope.user_id,
          "event_id": event_id
        };

        ElectEventAPI.postComment(comment).then(function(data){
          $scope.comment_text = '';
          populateEventData();
        });
      }
    };

    $scope.upvote = function() {
      if ($scope.event.upvoters.indexOf($scope.user_id) === -1) {
        if ($scope.event.downvoters.indexOf($scope.user_id) >= 0) {
          $scope.event.downvoters.splice($scope.event.downvoters.indexOf($scope.user_id), 1);
          $scope.event.votes += 2;
        } else {
          $scope.event.votes += 1;
        }
        $scope.event.upvoters.push($scope.user_id);
      } else {
        $scope.event.upvoters.splice($scope.event.upvoters.indexOf($scope.user_id), 1);
        $scope.event.votes -= 1;
      }
      ElectEventAPI.updateEvent($scope.event).then(function(data) {
        $scope.event.votes = data.data.votes;
      });
    };

    $scope.downvote = function() {
      if ($scope.event.downvoters.indexOf($scope.user_id) === -1) {
        if ($scope.event.upvoters.indexOf($scope.user_id) >= 0) {
          $scope.event.upvoters.splice($scope.event.upvoters.indexOf($scope.user_id), 1)
          $scope.event.votes -= 2;
        } else {
          $scope.event.votes -= 1;
        }
        $scope.event.downvoters.push($scope.user_id);
      } else {
        $scope.event.downvoters.splice($scope.event.downvoters.indexOf($scope.user_id), 1);
        $scope.event.votes += 1;
      }
      ElectEventAPI.updateEvent($scope.event).then(function(data) {
        $scope.event.votes = data.data.votes;
      });
    };

    populateEventData();

  }]);
