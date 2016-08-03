'use strict';

app.controller('pairCtrl', function($scope, bookFactory, $rootScope, pairFactory, albumFactory) {

  $scope.album = false;
  $scope.selectedBook = null;

  $scope.pair = function() {
    $scope.selectedBook = bookFactory.getSelectedBook();
    pairFactory.getSubjectNames($scope.selectedBook.subjects)
      .then((albumTagArray) => {
        // albumFactory.getAlbums($scope.removeDuplicates(albumTagArray));
        // let uniqueTagArray = $scope.removeDuplicates(albumTagArray);
        // console.log("", uniqueTagArray);
        albumFactory.callGetAlbum($scope.removeDuplicates(albumTagArray))
      });
  };

  $scope.removeDuplicates = function(albumTagArray) {
    return albumTagArray.filter(function(elem, index, self) {
      return index == self.indexOf(elem) && elem !== undefined;
    });
  };

  // $scope.callGetAlbum = function(uniqueTagArray) {
  //   uniqueTagArray.forEach((value, i) => {
  //     console.log("", value);
  //   });
  // };

});

// array sort method