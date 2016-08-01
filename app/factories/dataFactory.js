'use strict';

app.factory('dataFactory', function($q, $http, FirebaseURL) {

  let searchBy = null,
    bookList = [];

  const getGoogleBooks = function(searchTerms) {
    return $q((resolve, reject) => {
      $http.get(`https://www.googleapis.com/books/v1/volumes?q=in${searchBy}:${searchTerms}&max-results=40&key=AIzaSyA0F3r1-DQZP28idMye-KQkYYroQqkctl0`)
        .success((data) => {
          let itemArray = data.items;
          console.log("", data);
          itemArray.forEach((value, i) => {
            let identifierArray = value.volumeInfo.industryIdentifiers;
            identifierArray.forEach((value, i) => {
              if (value.type === "ISBN_10" || value.type === "ISBN_13") {
                getOpenBook(value.identifier)
                // console.log("", value.identifier);
              }
            })
          });
        resolve(data);
      })
        .error((error) => {
          reject(error);
        });
    });
  };

  // const tesFunction = function() {
  //   return $q((resolve, reject) => {

  //   })
  // }

  const getOpenBook = function(isbn) {
    return $q((resolve, reject) => {
      $http({
        method: "GET",
        url: `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&&jscmd=data&format=json`
      })
        .success((data) => {
          bookList.push(data);
          console.log("", data);
        })
        .error((error) => {
          console.log("", error);
        })
    })
  }

  const getBookList = function() {
    return bookList;
  }

  const setSearchParam = function(value) {
    searchBy = value;
  }

  const getSearchParam = function() {
    return searchBy;
  }

  return {
    getOpenBook, getGoogleBooks, setSearchParam, getSearchParam
  };

});

// ${fbData.url}/forecasts.json?auth=${accessToken} try this for auth