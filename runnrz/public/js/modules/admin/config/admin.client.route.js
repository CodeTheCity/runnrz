'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

	 	var access = routingConfig.accessLevels;
	 	var item = ['123','hello world'];
	 	var modal = '';

		// Home state routing
		$stateProvider
			.state('public.login', {
				url: '/login',
				controller: 'AdminController',
				params: {
					 alerts: null
				},
				templateUrl: 'js/modules/admin/views/login.client.view.html'
			})
			.state('public.password-reset', {
				url: '/password-reset',
				templateUrl: 'js/modules/admin/views/reset.client.view.html'
			})
			.state('public.register', {
	        	url: '/register',
	        	templateUrl: 'js/modules/admin/views/register.client.view.html',
	        })
			.state('public.logout', {
				url: '/logout',
				controller: function($state, $localStorage, $sessionStorage, $cookieStore, $scope){
					/*delete $sessionStorage.loginToken
					document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';*/
					$scope.header.adminAccess = false;
					$scope.header.adminHeader = false;
					$cookieStore.remove('access_token');
					$cookieStore.remove('refresh_token');
					document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
					document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
					var alert = {type: 'info', msg: 'You have been logged out'};
					$state.go('public.login', {'alerts': alert});
				}
			});

		$stateProvider
			.state('admin', {
				abstract: true,
				template: "<ui-view/>",
		        data: {
		            access: access.admin
		        }
			})
			.state('admin.dashboard', {
				url: '/admin',
				templateUrl: 'js/modules/admin/views/dashboard.client.view.html'
			});
	}
]);