var weather = angular.module('weather', ['ngRoute', 'ngResource']);

weather.config(['$routeProvider', '$locationProvider', function ($routeProvider,  $locationProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.html',
    controller:  'homeController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller:  'forecastController'
  })

}]);

weather.controller('homeController', ['$scope', '$resource', function($scope, $resource) {

}]);

weather.controller('forecastController', ['$scope', '$resource', function($scope, $resource) {

}]);
