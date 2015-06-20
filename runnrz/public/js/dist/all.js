'use strict';

var siteBaseUrl = "https://local.jobs.alta-blue.com";

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'abjb';
	var applicationModuleVendorDependencies = ['ngResource', 'ngRoute', 'ngCookies',  'ngAnimate', 'ui.select', 'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'angular-ladda', 'ngHolder', 'angular-loading-bar', 'ngStorage', 'angularMoment', 'ngMap'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
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

function onLinkedInLoad() {
	IN.Event.on(IN, "auth", onLinkedInAccess);
}

function onLinkedInLogout() {
	//location.reload(true);
}

function onLinkedInAccess(){
	angular.element(document.getElementById("linkedInJS")).scope().$apply(
		function($scope) {
			$scope.linkedInAccessGrant();
		}
	);
}
(function(exports){

    var config = {

        /* List all the roles you wish to use in the app
        * You have a max of 31 before the bit shift pushes the accompanying integer out of
        * the memory footprint for an integer
        */
        roles :[
            'public',
            'user',
            'admin'],

        /*
        Build out all the access levels you want referencing the roles listed above
        You can use the "*" symbol to represent access to all roles.

        The left-hand side specifies the name of the access level, and the right-hand side
        specifies what user roles have access to that access level. E.g. users with user role
        'user' and 'admin' have access to the access level 'user'.
         */
        accessLevels : {
            'public' : "*",
            'anon': ['public'],
            'user' : ['user', 'admin'],
            'admin': ['admin']
        }

    }

    exports.userRoles = buildRoles(config.roles);
    exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

    /*
        Method to build a distinct bit mask for each role
        It starts off with "1" and shifts the bit to the left for each element in the
        roles array parameter
     */

    function buildRoles(roles){

        var bitMask = "01";
        var userRoles = {};

        for(var role in roles){
            var intCode = parseInt(bitMask, 2);
            userRoles[roles[role]] = {
                bitMask: intCode,
                title: roles[role]
            };
            bitMask = (intCode << 1 ).toString(2)
        }

        return userRoles;
    }

    /*
    This method builds access level bit masks based on the accessLevelDeclaration parameter which must
    contain an array for each access level containing the allowed user roles.
     */
    function buildAccessLevels(accessLevelDeclarations, userRoles){

        var accessLevels = {};
        for(var level in accessLevelDeclarations){

            if(typeof accessLevelDeclarations[level] == 'string'){
                if(accessLevelDeclarations[level] == '*'){

                    var resultBitMask = '';

                    for( var role in userRoles){
                        resultBitMask += "1"
                    }
                    //accessLevels[level] = parseInt(resultBitMask, 2);
                    accessLevels[level] = {
                        bitMask: parseInt(resultBitMask, 2)
                    };
                }
                else console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'")

            }
            else {

                var resultBitMask = 0;
                for(var role in accessLevelDeclarations[level]){
                    if(userRoles.hasOwnProperty(accessLevelDeclarations[level][role]))
                        resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask
                    else console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'")
                }
                accessLevels[level] = {
                    bitMask: resultBitMask
                };
            }
        }

        return accessLevels;
    }

})(typeof exports === 'undefined' ? this['routingConfig'] = {} : exports);

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('admin');
'use strict';

// Configuring the Articles module
angular.module('admin').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		/*$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});*/
	}
]);
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
'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$stateParams', '$location', 'dataPassage', '$localStorage', '$sessionStorage', '$sce', '$cookieStore', 'dataPassage',

	function($scope, $stateParams, $location, $dataPassage, $localStorage, $sessionStorage, $sce, $cookieStore, dataPassage) {

		$scope.formData = {}

		$scope.alerts = [];

		$scope.$storage = $sessionStorage;

		if($stateParams.alerts){
			$scope.alerts.push($stateParams.alerts);
		}

		//$scope.$parent.adminHeader = false;
		
		$scope.login = function()
		{
			$scope.alerts = [];
			var formData = {};
			formData.data = {};
			$scope.searchLoading = true;
			formData.method = 'post';
			formData.apiController = 'users';
			formData.apiAction = 'login';
			var search = $scope.search;
			//console.log($scope.formData);
			formData.data.grant_type = 'password';
			formData.data.username = $scope.formData.data.username;
            formData.data.scope = 'write';
			formData.data.password = $scope.formData.data.password;
			formData.data.client_id = 'U6KhveuE9RvjB3Z9cQ2pXG';
            dataPassage.apiQuery(formData)
                .then(function(data){
                    $scope.searchLoading = false;
                    $cookieStore.put('access_token', data.data.access_token);
                    $cookieStore.put('refresh_token', data.data.refresh_token);
                    //createCookie('access_token', data.data.access_token, data.data.expires_in);
                   // createCookie('refresh_token', data.data.refresh_token, data.data.expires_in);
                    $scope.header.adminHeader = true;
                    $scope.adminHeader = true;
                    $scope.header.adminAccess = true;
                    $scope.adminAccess = true;
                    $location.path('/admin');
                }, function(data){
                    $scope.searchLoading = false;
                    $scope.alerts.push({type: 'danger', msg: data.data.error_description});
                   // $scope.flashStatus = $sce.trustAsHtml('<div class="alert alert-error>There has been an error. Please try your request again later.</div>')
                });
		}

		$scope.passReset = function()
		{
			$scope.loginLoading = true;
		}

	}

]).controller('RegisterController', ['$scope', '$stateParams', '$state', '$location', '$localStorage', '$sessionStorage', '$sce', '$cookies', '$cookieStore',

	function($scope, $stateParams, $state, $location, $localStorage, $sessionStorage, $sce, $cookies, $cookieStore) {

		$scope.header.adminHeader = false;

		$scope.register = function()
		{
			$scope.alerts = [];
			var formData = {};
			formData.data = {};
			$scope.searchLoading = true;
			formData.method = 'post';
			formData.apiController = 'users';
			formData.apiAction = 'login';
			var search = $scope.search;
			//console.log($scope.formData);
			formData.data.grant_type = 'password';
			formData.data.username = $scope.formData.data.username;
            formData.data.scope = 'write';
			formData.data.password = $scope.formData.data.password;
			formData.data.client_id = 'U6KhveuE9RvjB3Z9cQ2pXG';
            dataPassage.apiQuery(formData)
                .then(function(data){
                    $scope.searchLoading = false;
                    $cookieStore.put('access_token', data.data.access_token);
                    $cookieStore.put('refresh_token', data.data.refresh_token);
                    //createCookie('access_token', data.data.access_token, data.data.expires_in);
                   // createCookie('refresh_token', data.data.refresh_token, data.data.expires_in);
                    $scope.header.adminHeader = true;
                    $scope.adminHeader = true;
                    $scope.header.adminAccess = true;
                    $scope.adminAccess = true;
                    $location.path('/admin');
                }, function(data){
                    $scope.searchLoading = false;
                    $scope.alerts.push({type: 'danger', msg: data.data.error_description});
                   // $scope.flashStatus = $sce.trustAsHtml('<div class="alert alert-error>There has been an error. Please try your request again later.</div>')
                });
		}

	}

]);

function createCookie(name,value,expire) {
  if (expire) {
    var date = new Date();
    date.setTime(date.getTime()+(expire));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
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
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('admin').factory('dataPassage', ['$http', '$cookies',

    function ($http, $cookies) {

        return {

            apiQuery: function (passedData){
                var url = siteBaseUrl+'/api/1.0/'+passedData.apiController+'/';
                if(typeof passedData.apiAction != 'undefined'){
                    url=url+passedData.apiAction+'/';
                }
                if(typeof passedData.params != 'undefined'){
                    url=url+passedData.params;
                }
                //console.log(url);
                var req = {
                    method: passedData.method,
                    url: url,
                    headers: {
                        'contentType': 'application/json'
                    },
                    data: passedData.data
                }
                return $http(req)
                    .success(function(data){
                        return data;
                    })
                    .error(function(data){
                        return 'error';
                    }); 
            }
        }

    }
])

.factory('Auth', ['$http', '$cookieStore', '$localStorage', '$sessionStorage',

    function($http, $cookieStore, $localStorage, $sessionStorage){

        var accessLevels = routingConfig.accessLevels
            , userRoles = routingConfig.userRoles;

            if($cookieStore.get('access_token')){
                var currentUser = { username: $cookieStore.get('access_token'), role: userRoles.admin }
            }else{
                var currentUser =  { username: '', role: userRoles.public }
            }

        //$cookieStore.remove('user');

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        return {
            authorize: function(accessLevel, role) {

                if($cookieStore.get('access_token')){
                    var currentUser = { username: $cookieStore.get('access_token'), role: userRoles.admin }
                }else{
                    var currentUser =  { username: '', role: userRoles.public }
                }

                console.log(currentUser);
                
                if(role === undefined) {
                    role = currentUser.role;
                }

                return accessLevel.bitMask & role.bitMask;
            },
            isLoggedIn: function(user) {
                if(user === undefined) {
                    user = currentUser;
                }
                return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
            },
            getOAuthEncryption: function(){
                var at = this.getAccessToken('publicAccessToken');
                console.log(at)
                var hash = CryptoJS.HmacSHA512('gsQtGEr70bHTSn1HOY3nioWdEsBgb2vQqD3FJspxtv8&domain='+document.domain+'&access_token='+at,document.domain);
                return hash.toString();
            },
            getAccessToken: function(cname){
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
                }
                return "";
            },
            getNewAccessToken: function(cname){
                var data = {}
                data.grant_type = "refresh_token"
                data.refresh_token = $sessionStorage.loginToken
                data.jbuser = 'gsQtGEr70bHTSn1HOY3nioWdEsBgb2vQqD3FJspxtv'
                var req = {
                    method: 'POST',
                    url: siteBaseUrl+'/api/1.0/users/login/',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: serialize(data)
                }
                return $http(req)
                    .success(function(data){
                        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        $sessionStorage.loginToken = data.refresh_token;
                        createCookie('access_token', data.access_token, 1);
                        return data.access_token;
                    })
                    .error(function(data){
                        return 'error';
                    });  
            },
            accessLevels: accessLevels,
            userRoles: userRoles,
            user: currentUser
        };
    }
])
.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
})
.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
})

.directive('ngBindModel',function($compile){
    return{
        compile:function(tEl,tAtr){
          tEl[0].removeAttribute('ng-bind-model')
            return function(scope){
              tEl[0].setAttribute('ng-model',scope.$eval(tAtr.ngBindModel))
              $compile(tEl[0])(scope)
            }
        }
    }
});

var serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}


/*var getHMAC = function(key, timestamp) {
    var key2 = "A5woV0GpCX5NuNnWMoaOUZSiq4dC2RgK6rLm0OtpzY2Y7RVmplsEwEyuTgk7On2xekoYiBdSHItMei9N8Os6c9jfqGvrpGlULOadHH6iH4StZDEeSw7TBebhAGAi8wKFuBFOBctei78s6m8GWbq6HL84FM5BpdaFhTKUuMvuVEy57mtWYya7nJ08uSNohexsYsFggF0LILZKMwmk2OBJiltnTk39duJA2DQ";
    var hash = CryptoJS.HmacSHA512(key+timestamp,key2);
    return hash.toString();
};

var getMicrotime = function (get_as_float) {

  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);

  return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
}; */
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('pages');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Configuring the Articles module
angular.module('pages').config(['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider',
	function($stateProvider, $urlRouterProvider, $cfpLoadingBarProvider) {
		$cfpLoadingBarProvider.includeSpinner = false;
		// Redirect to home view when route not found

	}
]);
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
'use strict';

angular.module('pages').controller('HomepageController', ['$scope', '$stateParams', '$state', '$location', '$localStorage', '$sessionStorage', '$sce', '$cookies', '$cookieStore',

	function($scope, $stateParams, $state, $location, $localStorage, $sessionStorage, $sce, $cookies, $cookieStore) {

		$scope.header.adminHeader = false;

	}

]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('pages').factory('routeCheck', ['$http', '$cookies',

    function ($http, $cookies) {

    	return {

    		routeJsonCheck: function(json, value, key)
    		{
    			var hasMatch =false;
    			var state = false;

				for (var index = 0; index < json.length; ++index) {

					var route = json[index];

					//console.log(route.url);

					if(route[key] == value){
					    hasMatch = true;
					    state = route
						break;
					}
				}
				var returned = {'hasMatch': hasMatch, 'state': state}
				return returned;
    		}

    	}

    }
]);



'use strict';
'use strict';

angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		var access = routingConfig.accessLevels;

	}
])

.run(['$rootScope', '$state', 'Auth', '$modalStack', '$http', 'dataPassage', '$location',  function ($rootScope, $state, Auth, $modalStack, $http, dataPassage, $location) {

    $rootScope.$on('$stateNotFound', function (event, toState, toParams, fromState, fromParams) {
        console.log('state not found');
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        alert("ROUTE CHANGE ERROR: " + rejection);
    });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        
        if(!('data' in toState) || !('access' in toState.data)){
        	console.log(toState);
            $rootScope.error = "Access undefined for this state";
            console.log($rootScope.error);
            //event.preventDefault();
        }
        else if (!Auth.authorize(toState.data.access)) {
            $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
            console.log($rootScope.error);
            event.preventDefault();
            if(fromState.url === '^') {
                if(Auth.isLoggedIn()) {
                    $state.go('public.home');
                } else {
                    //$rootScope.error = null;
                    console.log($state);
                    var alert = {type: 'info', msg: 'Your session has timed out, please log in again'};
                    $state.go('public.login', {'alerts': alert});
                }
            }else{
                $state.go('public.login');
            }
        }
        else if(Auth.authorize(toState.data.access) && toState.data.access.bitMask == 4){
            if(!Auth.getAccessToken('access_token')){
                Auth.getNewAccessToken();
            }
        }

        var top = $modalStack.getTop();
        if (top) {
            $modalStack.dismiss(top.key);
        }

    });

}])

.run(['$rootScope', '$injector', '$cookies', '$cookieStore', function($rootScope,$injector, $cookies, $cookieStore) {

            /*if($cookieStore.get('access_token')){
                $http.defaults.headers.common['Authorization'] = 'Bearer '+$cookieStore.get('access_token');
            }else{
                $http.defaults.headers.common['Authorization'] = 'Bearer '+$cookies.publicAccessToken;
            }*/

    $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
        //headersGetter()['Authorization'] = "Bearer " + sessionService.getAccessToken();
        if($cookieStore.get('access_token')){
            headersGetter()['Authorization'] = 'Bearer '+$cookieStore.get('access_token');
        }else{
            headersGetter()['Authorization'] = 'Bearer '+$cookies.publicAccessToken;
        }
        if (data) {
            return angular.toJson(data);
        }
    };
}]);
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
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('core').factory('Global', ['$http', '$cookies',

    function ($http, $cookies) {
        
       
    }
])

/*.factory('api', function ($http, $cookies, $cookieStore) {
	return {
		init: function (token) {
			if($cookieStore.get('access_token')){
				$http.defaults.headers.common['Authorization'] = 'Bearer '+$cookieStore.get('access_token');
			}else{
				$http.defaults.headers.common['Authorization'] = 'Bearer '+$cookies.publicAccessToken;
			}
		}
	};
});*/
