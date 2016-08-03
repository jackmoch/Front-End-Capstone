'use strict';

app.controller('pairCtrl', function($scope, bookFactory, $rootScope, pairFactory, albumFactory) {

  $scope.album = false;
  $scope.selectedBook = null;

  $scope.pair = function() {
    $scope.selectedBook = bookFactory.getSelectedBook();
    pairFactory.getSubjectNames($scope.selectedBook.subjects)
      .then((albumTagArray) => {
        albumFactory.callGetAlbum($scope.removeDuplicates(albumTagArray))
          .then((albumArray) => {
            console.log("", albumArray);
            // $scope.albumArray = $scope.shuffle(albumArray);
            // console.log("", $scope.albumArray);
          });
      });
  };

  $scope.removeDuplicates = function(albumTagArray) {
    return albumTagArray.filter(function(elem, index, self) {
      return index == self.indexOf(elem) && elem !== undefined;
    });
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

// array sort method