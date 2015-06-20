'use strict';

var $urlRouterProviderRef = null;
var $stateProviderRef = null;
var $locationProviderRef = null;

angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    	$urlRouterProviderRef = $urlRouterProvider;
    
    	$locationProvider.html5Mode(true);
    	$stateProviderRef = $stateProvider;
    	$locationProviderRef = $locationProvider;

		$urlRouterProvider.rule(function($injector, $location) {
	        if($location.protocol() === 'file')
	            return;

	        var path = $location.path()
	        // Note: misnomer. This returns a query object, not a search string
	            , search = $location.search()
	            , params
	            ;

	        // check to see if the path already ends in '/'
	        if (path[path.length - 1] === '/') {
	            return;
	        }

	        // If there was no search string / query params, return with a `/`
	        if (Object.keys(search).length === 0) {
	            return path + '/';
	        }

	        // Otherwise build the search string and return a `/?` prefix
	        params = [];
	        angular.forEach(search, function(v, k){
	            params.push(k + '=' + v);
	        });
	        return path + '/?' + params.join('&');
	    });

	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$interpolateProvider','$routeProvider','$locationProvider','$resourceProvider',
	function($interpolateProvider,$routeProvider,$locationProvider,$resourceProvider) {
  		$interpolateProvider.startSymbol('[{[');
 	 	$interpolateProvider.endSymbol(']}]');
 	 	$resourceProvider.defaults.stripTrailingSlashes = true;
 	 }
]);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$urlMatcherFactoryProvider',
	function ($urlMatcherFactoryProvider) {
	  $urlMatcherFactoryProvider.caseInsensitive(true);
	  $urlMatcherFactoryProvider.strictMode(true);
	}
]);

angular.element(document).ready(function() {
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});