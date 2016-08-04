'use strict';

app.controller('pairCtrl', function($scope, bookFactory, $rootScope, pairFactory, albumFactory, authFactory, dataFactory) {

  $scope.album = false;
  $scope.selectedBook = null;
  $scope.currentAlbumArray = [];
  $scope.user = false;
  let counter = 0;

  $scope.pair = function() {
    $scope.selectedBook = bookFactory.getSelectedBook();
    pairFactory.getSubjectNames($scope.selectedBook.subjects)
      .then((albumTagArray) => {
        albumFactory.callGetAlbum($scope.removeDuplicates(albumTagArray))
          .then((albumArray) => {
            // console.log("", albumArray);
            $scope.currentAlbumArray = [];
            for (let i = 0; i < albumArray.length; i++) {
              $scope.currentAlbumArray.push(albumArray[i]);
            }
            // console.log("", $scope.currentAlbumArray);
            $scope.currentAlbumArray = $scope.shuffle($scope.currentAlbumArray);
            // console.log($scope.currentAlbumArray);
            // albumArray = $scope.shuffle(albumArray);
            // console.log("", albumArray);
            $scope.album = true;
            $scope.setCurrentAlbum(0);
            $scope.user = authFactory.getUser();
          });
      });
  };

  $scope.changeCurrentAlbum = function() {
    counter++
    if (counter >= $scope.currentAlbumArray.length) {
      counter = 0
    };
    $scope.setCurrentAlbum(counter)
  }

  $scope.setCurrentAlbum = function(index) {
    $scope.currentAlbum = $scope.currentAlbumArray[index];
    $scope.currentAlbumImage = $scope.currentAlbumArray[index].image[2][Object.keys($scope.currentAlbumArray[0].image[3])[0]];
  }

  $scope.removeDuplicates = function(albumTagArray) {
    return albumTagArray.filter(function(elem, index, self) {
      return index == self.indexOf(elem) && elem !== undefined;
    });
  };

  $scope.buildFavoriteObject = function() {
    $scope.currentAlbum.favorite = true;
    let selectedBook = bookFactory.getSelectedBook();
    let uid = authFactory.getUser();
    let favoriteObject = {
      bookAuthor: selectedBook.authors[0].name,
      bookCover: selectedBook.cover.large,
      bookTitle: selectedBook.title,
      albumArtist: $scope.currentAlbum.artist.name,
      albumName: $scope.currentAlbum.name,
      albumImage: $scope.currentAlbumImage,
      stars: {
        "0": {
          filled: false
        },
        "1": {
          filled: false
        },
        "2": {
          filled: false
        },
        "3": {
          filled: false
        },
        "4": {
          filled: false
        }
      },
      uid: uid
    }
    dataFactory.postData(favoriteObject).
    then((key) => {
      $scope.currentAlbum.refKey = key.name;
      favoriteObject.refKey = key.name;
    });
  };

  $scope.removeFavorite = function(refKey) {
    $scope.currentAlbum.favorite = false;
    dataFactory.deleteFavorite(refKey);
  };

  $scope.shuffle = function(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

});