'use strict';

const app = angular.module('pairApp', ['ngRoute', 'ngMaterial'])
  .constant('FirebaseURL', 'https://perfect-pairs.firebaseio.com/');

app.run(["$location", "FBCreds", "authFactory", "dataFactory",

  function($location, FBCreds, authFactory, dataFactory) {
    let authConfig = {
      apiKey: FBCreds.apiKey,
      authDomain: FBCreds.authDomain
    };

    firebase.initializeApp(authConfig);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        authFactory.setUser(user.uid);
        // $location.url("/boards");
      } else {
        // $location.url("/login");
        authFactory.setUser(null); //this is to rest the current user to hide board.
      }
    });
  }
]);

app.config(function($routeProvider, $httpProvider) {

  //routing
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl'
    })
    .when('/search', {
      templateUrl: 'partials/search.html',
      controller: 'searchCtrl'
    })
    .otherwise('/login');

});