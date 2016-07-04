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

  $scope.days = $routeParams.days || '5';

  // Need to add an API ID for this app to access the site's API (replace where XXX)
  var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=XXX', {callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}});

  $scope.weatherResult = weatherAPI.get({q: $scope.city, cnt: $scope.days});

  console.log($scope.weatherResult);

  $scope.convertToCelsius = function(degK) {

    return Math.round(degK - 273.15);

  };

  $scope.convertToDate = function(dt) {

    return new Date(dt * 1000);

  }

  $scope.convertWeatherId = function(code) {

    var response;

    if (code >= 200 && code <= 299 ) {

      response = 'thunderstorm';

    } else if (code >= 300 && code <= 399) {

      response = 'drizzle';

    } else if (code >= 500 && code <= 501) {

      response = 'light_rain';

    } else if (code >= 502 && code <= 599) {

      response = 'rain';

    } else if (code >= 600 && code <= 699) {

      response = 'snow';

    } else if (code === 800) {

      response = 'sunny';

    } else if (code >= 801 && code <= 899) {

      response = 'cloudy';

    } else if (code >= 700 && code <= 799 || code >= 900 && code <= 910) {

      response = 'crap';

    } else {

      response = 'dunno';

    };

    return response;

  };

}]);
