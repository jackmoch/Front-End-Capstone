'use strict';

app.factory('bookFactory', function($q, $http) {

  let searchBy = null,
    bookList = [],
    selectedBook;

  const getGoogleBooks = function(searchTerms) {
    return $q((resolve, reject) => {
      $http.get(`https://www.googleapis.com/books/v1/volumes?q=in${searchBy}:${searchTerms}&maxResults=40&key=AIzaSyA0F3r1-DQZP28idMye-KQkYYroQqkctl0`)
        .success((data) => {
          let googleBookArray = [];
          googleBookArray = data.items;
          resolve(googleBookArray);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  const buildIsbnArray = function(googleBookArray) {
    let isbnArray = [];
    return $q((resolve, reject) => {
      googleBookArray.forEach((value, i) => {
        if (value.volumeInfo.industryIdentifiers) {
          isbnArray.push(value.volumeInfo.industryIdentifiers);
        }
      });
      resolve(isbnArray);
    });
  };

  const buildValidIbsnArray = function(isbnArray) {
    let validIsbnArray = [];
    return $q((resolve, reject) => {
      isbnArray.forEach((value, i) => {
        value.forEach((value, i) => {
          if (value.type === "ISBN_13") {
            validIsbnArray.push(value.identifier);
          }
        });
      });
      resolve(validIsbnArray);
    });
  };

  const openBookPromise = function(validIsbnArray) {
    bookList = [];
    return $q((resolve, reject) => {
      callOpenBook(validIsbnArray)
        .then(function() {
          resolve();
        });
    });
  };

  const callOpenBook = function(validIsbnArray) {
    return $q((resolve, reject) => {
      validIsbnArray.forEach((value, i) => {
        getOpenBook(value)
          .then(function(data) {
            if (validIsbnArray.length - 1 === i) {
              resolve();
            }
          });
      });
    });
  };

  const getOpenBook = function(isbn) {
    return $q((resolve, reject) => {
      $http({
        method: "GET",
        url: `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&&jscmd=data&format=json`
      })
        .success((data) => {
          if (data['ISBN:' + isbn] && data['ISBN:' + isbn].subjects) {
            bookList.push(data['ISBN:' + isbn]);
          }
          resolve(data);
        })
        .error((error) => {
          console.log("", error);
        });
    });
  };

  const setSearchParam = function(value) {
    searchBy = value;
  };

  const setSelectedBook = function(book) {
    selectedBook = book;
  };

  const getSelectedBook = function() {
    return selectedBook;
  };

  const getBookList = function() {
    return bookList;
  };

  const getSearchParam = function() {
    return searchBy;
  };

  return {
    getOpenBook, getGoogleBooks, setSearchParam,
    getSearchParam, buildIsbnArray, buildValidIbsnArray,
    callOpenBook, getBookList, openBookPromise, setSelectedBook,
    getSelectedBook
  };

});

// ${fbData.url}/forecasts.json?auth=${accessToken} try this for auth