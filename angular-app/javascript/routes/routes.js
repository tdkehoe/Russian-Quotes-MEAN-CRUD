app.config(function($routeProvider){

  $routeProvider
  .when('/new', { // must be above '/:id' otherwise it'll think that the ID is 'new'
    templateUrl: 'templates/new.html',
    controller: 'NewController'
  })
  .when('/:id/edit', {
    templateUrl: 'templates/edit.html',
    controller: 'EditController'
  })
  .when('/:id', {
    templateUrl: 'templates/show.html',
    controller: 'ShowController'
  })
  .when('/', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  })
  .otherwise({ redirectTo: '/' });
});
