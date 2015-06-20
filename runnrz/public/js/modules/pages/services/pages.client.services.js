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


