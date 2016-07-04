// MODULES

var weather = angular.module('weather', ['ngRoute', 'ngResource']);

// ROUTES

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

// SERVICES

weather.service('searchCityService', function() {

  this.city = 'Toronto, ON';

});

// CONTROLLERS

weather.controller('homeController', ['$scope', 'searchCityService', function($scope, searchCityService) {

  $scope.city = searchCityService.city;

  $scope.$watch('city', function() {

    searchCityService.city = $scope.city;

  });

}]);

weather.controller('forecastController', ['$scope', '$resource', 'searchCityService', function($scope, $resource, searchCityService) {

  $scope.city = searchCityService.city;

  var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=X', {callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}});

  $scope.weatherResult = weatherAPI.get({q: $scope.city, cnt: 5});

  console.log($scope.weatherResult)

}]);
