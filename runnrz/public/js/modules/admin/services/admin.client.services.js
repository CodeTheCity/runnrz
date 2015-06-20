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