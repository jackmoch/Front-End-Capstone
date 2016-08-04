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

  $scope.removeFavorite = function(refKey) {
    dataFactory.deleteFavorite(refKey)
      .then(() => {
        dataFactory.getFavorites()
          .then((favorites) => {
            $scope.favorites = favorites;
          })
      })
  };

});