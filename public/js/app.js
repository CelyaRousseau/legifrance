// global angular
'use strict';

var appLegifrance = angular.module('appLegifrance', ['ngRoute']);

appLegifrance.config(function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
      controller: 'dashboard',
      templateUrl: 'index'
    }).
    otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});