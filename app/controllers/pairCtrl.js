'use strict';

app.controller('pairCtrl', function($scope, bookFactory, $rootScope) {

  $scope.album = false;

  $scope.pair = function() {
    $scope.selectedBook = bookFactory.getSelectedBook();
    console.log("", $scope.selectedBook);
  };

});