'use strict';

app.controller('pairCtrl', function($scope, bookFactory, $rootScope, pairFactory) {

  $scope.album = false;
  $scope.selectedBook = null;

  $scope.pair = function() {
    $scope.selectedBook = bookFactory.getSelectedBook();
    pairFactory.getSubjectNames($scope.selectedBook.subjects)
      .then((albumTagArray) => {
        console.log(albumTagArray);
      });
  };

});

// array sort method