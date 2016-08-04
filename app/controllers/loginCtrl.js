'use strict';

app.controller('loginCtrl', function($scope, $route, authFactory, $location) {

  $scope.login = function() {
    console.log("Login initialized");
    authFactory.authWithProvider(authFactory.googleProvider)
      .then(function(result) {
        let user = result;
        console.log("result", user);
        var uid = result.user.uid;
        console.log("logged in user", uid);
        $location.path('/search');
        $scope.$apply();
      }).catch(function(error) {
        console.log(error);
      });
  };

  // $scope.newEmail = function() {
  //   authFactory.createWithEmail($scope.email, $scope.password)
  //     .then(function(result) {
  //       // var user = result.uid;
  //       console.log("logged in user", result.uid);
  //     })
  //     .catch(function(err) {
  //       console.log(error);
  //     });
  // };

  // $scope.existingEmail = function() {
  //   authFactory.authWithEmail($scope.email, $scope.password)
  //     .then(function(result) {})
  //     .catch(function(err) {
  //       console.log(err);
  //     })
  // };
});