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