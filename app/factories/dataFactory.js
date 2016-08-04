'use strict';

app.factory('dataFactory', function($q, $http, FirebaseURL) {

  const postData = function(newFavorite) {
    let data = [];
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

  const getFavorites = function(key) {
    let data = [];
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}/favorites.json`)
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

  const putDataEdits = function(objectToEdit) {
    return $q((resolve, reject) => {
      $http.put(`${FirebaseURL}/favorites/${objectToEdit.refKey}.json`, objectToEdit)
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
      if (!dataCollection[key].refKey) {
        dataCollection[key].refKey = key;
        dataArray.push(dataCollection[key]);
      }
    });

    dataArray.forEach((value, i) => {
      console.log("", value);
      putDataEdits(value);
    })

    return dataArray;
  }

  return {
    postData
  }

})