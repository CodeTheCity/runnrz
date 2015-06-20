'use strict';

angular.module('core').controller('CoreController', ['$scope', '$stateParams', '$localStorage', '$sessionStorage', '$cookieStore',

	function ($scope, $stateParams, $localStorage, $sessionStorage, $cookieStore) {

		$scope.alerts = [];

		$scope.header = {};

		$scope.header.adminHeader = $stateParams.adminHeader || false;

		$scope.header.adminAccess = false;

		console.log($scope.header.adminAccess)

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

	}

]);