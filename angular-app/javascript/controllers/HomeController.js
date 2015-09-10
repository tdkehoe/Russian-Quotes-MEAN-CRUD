app.controller('HomeController', ["$scope", '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams){
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

  // Comments function
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
}]);

app.controller('NewController', ["$scope", '$http', '$location', '$route', function($scope, $http, $location, $route){
  console.log("New controller");
  $scope.addQuote = function(quote){ // NEW
    var quote = {
      quoteText:  $scope.quote.quoteText,
      quoteAuthor: $scope.quote.quoteAuthor
    }
    $http.post('http://localhost:8080/api/quotes/', quote).then(function(response) {
      console.log("Quote added.");
      $location.path( "/" );
    }, function(response) {
      console.log("Invalid URL");
    });
  }
}]);

app.controller('ShowController', ["$scope", '$http', "$routeParams", function($scope, $http, $routeParams){
  console.log("Show controller");
  $http.get('http://localhost:8080/api/quotes/' + $routeParams.id).then(function(response) { // SHOW
    $scope.oneQuote = response.data;
    console.log(response.data);
  }, function(response) {
    console.log("Invalid URL");
  });
}]);

app.controller('EditController', ["$scope", '$http', '$route', '$routeParams', '$location', function($scope, $http, $route, $routeParams, $location){
  console.log("Edit controller");
  $http.get('http://localhost:8080/api/quotes/' + $routeParams.id + '/edit/').then(function(response) { // EDIT
    $scope.editQuote = response.data;
    console.log(response.data);
  }, function(response) {
    console.log("Invalid URL");
  });

  $scope.updateQuote = function(quote) {
    console.log("Updating quote.");
    var quote = {
      quoteText:  $scope.quote.quoteText,
      quoteAuthor: $scope.quote.quoteAuthor
    };
    console.log($routeParams.id);
    $http.put('http://localhost:8080/api/quotes/' + $routeParams.id, quote).then(function(response) { // UPDATE
      $location.path( "/" );
      console.log("Quote updated.");
    }, function(response) {
      console.log("Invalid URL");
    });
  }
}]);
