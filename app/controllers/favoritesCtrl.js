'use strict';

app.controller('favoritesCtrl', function(dataFactory, $scope, authFactory) {

  $scope.favorites = [];
  $scope.user = null;

  $scope.populateFavorites = function() {
    $scope.user = authFactory.getUser();
    console.log($scope.user);
    dataFactory.getFavorites()
      .then((favorites) => {
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

  $scope.rateSelectedAlbum = function(album, index) {
    if (!album.stars[index].filled) {
      for (let i = 0; i < index + 1; i++) {
        album.stars[i].filled = true
      }
    } else {
      for (let i = 4; i > index; --i) {
        album.stars[i].filled = false
      }
    }
    dataFactory.putDataEdits(album);
  };

});