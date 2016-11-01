'use strict';

app.controller('loginCtrl', function($scope, $route, authFactory, $location) {

  $scope.login = function() {
    authFactory.authWithProvider(authFactory.googleProvider)
      .then(function(result) {
        let user = result;
        var uid = result.user.uid;
        $location.path('/search');
        $scope.$apply();
      }).catch(function(error) {
        console.log(error);
      });
  };

  $scope.newEmail = function() {
    authFactory.createWithEmail($scope.email, $scope.password)
      .then(function(result) {
        console.log("logged in user", result.uid);
      })
      .catch(function(err) {
        console.log(error);
      });
  };

  $scope.existingEmail = function() {
    authFactory.authWithEmail($scope.email, $scope.password)
      .then(function(result) {
        if (result === undefined) {
          console.log("undefined");
        }
      })
      .catch(function(err) {
        console.log(err);
      })
  };
});