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
