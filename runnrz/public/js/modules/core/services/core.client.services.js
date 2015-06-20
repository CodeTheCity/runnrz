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
