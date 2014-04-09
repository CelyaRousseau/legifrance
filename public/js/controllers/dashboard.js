'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

appLegifrance.controller('dashboard', ['$scope','$location', function($scope, $location) {
    $scope.name = 'Brian';

    $scope.home      = { url: '/partials/home' };
    $scope.searchBar = { url: '/partials/searchBar' };
    $scope.navBar    = { url: '/partials/navBar' };

    $scope.isActive = false;

    $scope.toggleActive = function () {
        $scope.isActive = !$scope.isActive;
    };
}]);