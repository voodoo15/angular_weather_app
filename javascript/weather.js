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

weather.controller('homeController', ['$scope', '$resource', 'searchCityService', function($scope, $resource, searchCityService) {

  $scope.$watch('city', function() {

    $scope.city = searchCityService.city;

  });

}]);

weather.controller('forecastController', ['$scope', '$resource', 'searchCityService', function($scope, $resource, searchCityService) {

  $scope.$watch('city', function() {

    $scope.city = searchCityService.city;

  });

}]);
