'use strict';

// Setting up route
angular.module('pages').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
		// Redirect to home view when route not found
	 	var access = routingConfig.accessLevels;

	    $stateProvider
	        .state('public', {
	            abstract: true,
	            template: "<ui-view/>",
	            data: {
	                access: access.public
	            }
	        })
	        .state('public.home', {
	        	url: '/',
	        	templateUrl: 'js/modules/pages/views/home.client.view.html',
	        });
	}
]);