'use strict';

app.controller('searchCtrl', function($scope, bookFactory, $location, $rootScope) {
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
    bookFactory.getGoogleBooks(terms, "0")
      .then(function(googleBooksArray) {
        console.log("", googleBooksArray);
        bookFactory.buildIsbnArray(googleBooksArray)
          .then(function(isbnArray) {
            bookFactory.buildValidIbsnArray(isbnArray)
              .then(function(validIsbnArray) {
                bookFactory.openBookPromise(validIsbnArray)
                  .then(function() {
                    $scope.booklist = bookFactory.getBookList();
                    $scope.searchCompleted = true;
                  });
              });
          });
      });
  };

  $scope.selectBook = function(selectedBook) {
    console.log(selectedBook);
    bookFactory.setSelectedBook(selectedBook);
    $rootScope.selectedBookImage = selectedBook.cover.large;
    $rootScope.selectedBookTitle = selectedBook.title;
    $rootScope.selectedBookAuthor = selectedBook.authors[0].name;
    $location.path('/pair');
  };

});