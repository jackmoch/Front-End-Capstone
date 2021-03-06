
'use strict';

app.factory('dataFactory', function($q, $http, FirebaseURL, authFactory) {

  const postData = function(newFavorite) {
    let data = [];
    console.log("postData Called");
    return $q((resolve, reject) => {
      $http.post(
        `${FirebaseURL}/favorites.json`, JSON.stringify(newFavorite))
        .success((key) => {
          resolve(key);
        })
        .error((error) => {
          reject(error);
        });
    });
  };


  const getFavorites = function() {
    let uid = authFactory.getUser();
    let data = [];
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}/favorites.json?orderBy="uid"&equalTo="${uid}"`)
        .success((dataObject) => {
          data = keyAssigner(dataObject, data); //this assigns keys locally to the objects
          //the following forEach puts locally assigned keys on firebase
          resolve(data);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  const putDataEdits = function(album) {
    return $q((resolve, reject) => {
      $http.put(`${FirebaseURL}/favorites/${album.refKey}.json`, album)
        .success((data) => {
          resolve(data);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  function keyAssigner(object, dataArray) {
    let dataCollection = object;

    Object.keys(dataCollection).forEach((key) => {
      dataCollection[key].refKey = key;
      dataArray.push(dataCollection[key]);
    });

    return dataArray;
  }

  let deleteFavorite = function(refKey) {
    return $q(function(resolve, reject) {
      $http.delete(`${FirebaseURL}/favorites/${refKey}.json`)
        .success(function(data) {
          resolve(data);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  return {
    postData, getFavorites, deleteFavorite, putDataEdits
  }

})