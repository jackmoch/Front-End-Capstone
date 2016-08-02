'use strict';

app.controller('searchCtrl', function($scope, dataFactory) {
  var originatorEv;

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  }

  $scope.searchBy = function(val) {
    dataFactory.setSearchParam(val);
  }

  $scope.initiateSearch = function(searchTerms) {
    let terms = $scope.formatTerms(searchTerms);
    dataFactory.getGoogleBooks(terms)
      .then(function(googleBooksArray) {
        dataFactory.buildIsbnArray(googleBooksArray)
          .then(function(isbnArray) {
            dataFactory.buildValidIbsnArray(isbnArray)
              .then(function(validIsbnArray) {
                dataFactory.openBookPromise(validIsbnArray)
                  .then(function() {
                    $scope.booklist = dataFactory.getBookList();
                    console.log("", $scope.booklist);
                  })
              });
          })
      })
  }

  $scope.formatTerms = function(searchTerms) {
    return searchTerms.split(' ').join('+');
  }

})