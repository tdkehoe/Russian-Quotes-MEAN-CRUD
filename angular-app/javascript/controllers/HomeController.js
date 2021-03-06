app.controller('HomeController', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams){
  $scope.message = "Connected";
  $http.get('http://localhost:8080/api/quotes/').then(function(response) { // INDEX
    $scope.quotes = response.data;
  }, function(response) {
    console.log("Invalid URL");
  });

  $scope.deleteQuote = function(quote) { // DESTROY
    console.log("Deleting quote!");
    console.log(quote._id);
    $http.delete('http://localhost:8080/api/quotes/' + quote._id).then(function(response){
      $route.reload();
    }, function(response) {
      console.log("Failed to reload page.");
    });
  }

  $scope.upLike = function(quote) {
    console.log("Liked!");
    console.log(quote);
    var likes = quote.likes || 0;
    quote.likes += 1;
    console.log(likes);
    $http.put('http://localhost:8080/api/quotes/' + quote._id, quote).then(function(response) { // UPDATE
      console.log("Upliked.");
    }, function(response) {
      console.log("Invalid URL");
    });
  }

  $scope.downLike = function(quote) {
    console.log("Not liked!");
    console.log(quote);
    var likes = quote.likes || 0;
    quote.likes -= 1;
    console.log(likes);
    $http.put('http://localhost:8080/api/quotes/' + quote._id, quote).then(function(response) { // UPDATE
      console.log("Downliked.");
    }, function(response) {
      console.log("Invalid URL");
    });
  }

  $scope.newComment = function(quote) {
    var comment = {
      commentAuthor: quote.newComment.commentAuthor,
      commentText: quote.newComment.commentText,
      commentTimestamp: Date.now(),
    };
    var comments = quote.comments || [];
    comments.push(comment); // push comment to local $scope
    quote.newComment.commentAuthor = null; // needed to prevent autofilling fields
    quote.newComment.commentText = null; // needed to prevent autofilling fields
    quote.comments = comments; // saves new comment locally
    $http.put('http://localhost:8080/api/quotes/' + quote._id, quote).then(function(response) { // UPDATE
      $location.path( "/" );
      console.log("Comment added.");
    }, function(response) {
      console.log("Invalid URL");
    });
  }; // closes newComment

  $scope.deleteComment = function(quote, comment) {
    var index = quote.comments.indexOf(comment);
    quote.comments.splice(index, 1);
    $http.put('http://localhost:8080/api/quotes/' + quote._id, quote).then(function(response) { // UPDATE
      $location.path( "/" );
      console.log("Comment deleted.");
    }, function(response) {
      console.log("Invalid URL");
    });
  } // closes deleteComment

}]);
