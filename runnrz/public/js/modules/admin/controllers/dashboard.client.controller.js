'use strict';

angular.module('admin').controller('DashController', ['$scope', '$stateParams', '$state', '$location', 'dataPassage', '$localStorage', '$sessionStorage', '$sce', '$cookies',

	function($scope, $stateParams, $state, $location, $dataPassage, $localStorage, $sessionStorage, $sce, $cookies) {

		$scope.formData = {}

		$scope.alerts = [];

		$scope.$storage = $localStorage;

		$scope.header.adminHeader = true;

		$scope.header.adminAccess = true;

		/*if(!$localStorage.loginToken){
			$state.go('login');
		}*/

		$scope.authCheck = function()
		{
			
		}

	}

]);