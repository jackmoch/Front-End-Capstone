'use strict';

app.factory('dataFactory', function($q, $http, FirebaseURL) {

  const postData = function(newFavorite) {
    console.log("postData Called");
    return $q((resolve, reject) => {
      $http.post(
        `${FirebaseURL}/favorites.json`, JSON.stringify(newFavorite))
        .success((objectFromFirebase) => {
          resolve(objectFromFirebase);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  return {
    postData
  }

})