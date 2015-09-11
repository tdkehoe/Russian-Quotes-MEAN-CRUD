app.controller('ShowController', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams){
  console.log("Show controller");
  $http.get('http://localhost:8080/api/quotes/' + $routeParams.id).then(function(response) { // SHOW
    $scope.oneQuote = response.data;
    console.log(response.data);
  }, function(response) {
    console.log("Invalid URL");
  });

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
      console.log("Comment added.");
    }, function(response) {
      console.log("Invalid URL");
    });
  }; // closes newComment

  $scope.deleteComment = function(quote, comment) {
    console.log("Deleting comment.")
    console.log(comment);
    console.log(quote);
    var index = quote.comments.indexOf(comment);
    quote.comments.splice(index, 1);
    $http.put('http://localhost:8080/api/quotes/' + quote._id, quote).then(function(response) { // UPDATE
      console.log("Comment deleted.");
    }, function(response) {
      console.log("Invalid URL");
    });
  } // closes deleteComment
}]);
