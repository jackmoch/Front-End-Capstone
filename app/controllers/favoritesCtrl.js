'use strict';

app.controller('favoritesCtrl', function(dataFactory, $scope) {

  $scope.favorites = [];

  $scope.populateFavorites = function() {
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
  };

  $scope.ratingPreviewFill = (album, index) => {
    if (!album.stars[index].filled) {
      for (var i = 0; i <= index; i++) {
        album.stars[i].filled = true;
      }
    } else if (album.stars[index].filled) {
      for (var j = index + 1; j < album.stars.length; j++) {
        album.stars[j].filled = false;
      }
    }
  };

  $scope.clearStars = (album) => {
    for (var i = 0; i < 5; i++) {
      album.stars[i].filled = false;
    }
  };

});