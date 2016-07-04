// MODULES

var weather = angular.module('weather', ['ngRoute', 'ngResource']);

// ROUTES

weather.config(['$routeProvider', '$locationProvider', function ($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.html',
    controller:  'homeController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller:  'forecastController'
  })

  .when('/forecast/:days', {
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

weather.controller('forecastController', ['$scope', '$resource', '$routeParams', 'searchCityService', function($scope, $resource, $routeParams, searchCityService) {

  $scope.city = searchCityService.city;

  $scope.days = $routeParams.days || 5;

  var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=XXX', {callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}});

  $scope.weatherResult = weatherAPI.get({q: $scope.city, cnt: $scope.days});

  console.log($scope.weatherResult);

  $scope.convertToCelsius = function(degK) {

    return Math.round(degK - 273.15);

  };

  $scope.convertToDate = function(dt) {

    return new Date(dt * 1000);

  }

}]);
