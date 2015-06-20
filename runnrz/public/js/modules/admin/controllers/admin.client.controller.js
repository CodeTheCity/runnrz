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