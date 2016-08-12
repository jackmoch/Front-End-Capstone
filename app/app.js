'use strict';

const app = angular.module('pairApp', ['ngRoute', 'ngMaterial'])
  .constant('FirebaseURL', 'https://perfect-pairs.firebaseio.com');

app.run(["$location", "FBCreds", "authFactory",

  function($location, FBCreds, authFactory) {
    let authConfig = {
      apiKey: FBCreds.apiKey,
      authDomain: FBCreds.authDomain
    };

    firebase.initializeApp(authConfig);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        authFactory.setUser(user.uid);
      } else {
        $location.url("/login");
        authFactory.setUser(null); //this is to rest the current user to hide board.
      }
    });
  }
]);

app.config(function($routeProvider) {

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
    .when('/pair', {
      templateUrl: 'partials/pair.html',
      controller: 'pairCtrl'
    })
    .when('/favorites', {
      templateUrl: 'partials/favorites.html',
      controller: 'favoritesCtrl'
    })
    .otherwise('/search');

});