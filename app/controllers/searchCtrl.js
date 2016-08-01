'use strict';

app.controller('searchCtrl', function($scope, dataFactory) {
  var originatorEv,
    booklist;

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  }

  $scope.searchBy = function(val) {
    dataFactory.setSearchParam(val);
    console.log(dataFactory.getSearchParam());
  }

  $scope.initiateSearch = function(searchTerms) {
    let terms = $scope.formatTerms(searchTerms);
    console.log("", terms);
    dataFactory.getGoogleBooks(terms);
  }

  $scope.formatTerms = function(searchTerms) {
    return searchTerms.split(' ').join('+');
  }

})