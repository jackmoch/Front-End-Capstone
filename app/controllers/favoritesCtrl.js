'use strict';

app.controller('favoritesCtrl', function(dataFactory, $scope) {

  $scope.favorites = [];

  $scope.populateFavorites = function() {
    dataFactory.getFavorites()
      .then((favorites) => {
        console.log("", favorites);
        $scope.favorites = favorites;
      })
  };

  $scope.populateFavorites();

});