'use strict';

app.controller('navbarCtrl', function($scope, authFactory) {

	$scope.userState = function () {
		 return	authFactory.getUser() ? true : false;
	 };

	$scope.logout = function(){
		 firebase.auth().signOut()
		 .then(function() {
			 // Sign-out successful.
			 console.log(authFactory.getUser(), "Logged out");
			 authFactory.setUser(null);
		 }, function(error) {
			 // An error happened.
			 console.log(error);
		 });
	};

});