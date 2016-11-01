'use strict';

app.controller('navbarCtrl', function($scope, authFactory) {

	$scope.userState = function () {
		 return	authFactory.getUser() ? true : false;
	 };

	$scope.logout = function(){
		 firebase.auth().signOut()
		 .then(function() {
			 authFactory.setUser(null);
		 }, function(error) {
			 console.log(error);
		 });
	};

});