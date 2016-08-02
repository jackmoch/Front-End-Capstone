'use strict';

app.controller('searchCtrl', function($scope, bookFactory, $location, $rootScope, $timeout, $route) {
  let originatorEv;
  $scope.searchCompleted = false;

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.searchBy = function(val) {
    bookFactory.setSearchParam(val);
  };

  $scope.formatTerms = function(searchTerms) {
    return searchTerms.split(' ').join('+');
  };

  $scope.initiateSearch = function(searchTerms) {
    $scope.booklist = [];
    let terms = $scope.formatTerms(searchTerms);
    bookFactory.getGoogleBooks(terms)
      .then(function(googleBooksArray) {
        bookFactory.buildIsbnArray(googleBooksArray)
          .then(function(isbnArray) {
            bookFactory.buildValidIbsnArray(isbnArray)
              .then(function(validIsbnArray) {
                bookFactory.openBookPromise(validIsbnArray)
                  .then(function() {
                    $scope.booklist = bookFactory.getBookList();
                    console.log("", $scope.booklist);
                    $scope.searchCompleted = true;
                  });
              });
          });
      });
  };

  $scope.selectBook = function(selectedBook) {
    bookFactory.setSelectedBook(selectedBook);
    $rootScope.selectedBookImage = selectedBook.cover.large;
    console.log(bookFactory.getSelectedBook());
    $location.path('/pair');
  };

});