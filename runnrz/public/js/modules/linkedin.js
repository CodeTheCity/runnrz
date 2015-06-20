
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