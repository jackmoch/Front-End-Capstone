'use strict';

app.factory('dataFactory', function($q, $http, FirebaseURL) {

  const getData = function() {
    return $q((resolve, reject) => {
      $http.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:hemingway&key=AIzaSyA0F3r1-DQZP28idMye-KQkYYroQqkctl0`)
        .success((data) => {
          let itemArray = data.items;
          itemArray.forEach((value, i) => {
            let identifierArray = value.volumeInfo.industryIdentifiers;
            identifierArray.forEach((value, i) => {
              if (value.type === "ISBN_10" || value.type === "ISBN_10") {
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

  getData();

  const getOpenBook = function(isbn) {
    return $q((resolve, reject) => {
      $http.get(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&&jscmd=data&format=json`)
        .success((data) => {
          console.log("", data);
        })
        .error((error) => {
          console.log("", error);
        })
    })
  }

  // getOpenBook("0684801221")
  //   .then(function(data) {
  //     console.log("", data);
  //   });

  return {
    getOpenBook, getData
  };

});

// ${fbData.url}/forecasts.json?auth=${accessToken} try this for auth