app.controller('NewController', ["$scope", '$http', '$location', '$route', function($scope, $http, $location, $route){
  console.log("New controller");
  $scope.addQuote = function(quote){ // NEW
    var quote = {
      quoteText:  $scope.quote.quoteText,
      quoteAuthor: $scope.quote.quoteAuthor,
      likes: 0
    }
    $http.post('http://localhost:8080/api/quotes/', quote).then(function(response) {
      console.log("Quote added.");
      $location.path( "/" );
    }, function(response) {
      console.log("Invalid URL");
    });
  }
}]);
