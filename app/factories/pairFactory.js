'use strict';

app.factory('pairFactory', function($q, $http) {

  let albumTagArray = [],
    subjectCounter = 0,
    placesCounter = 0;

  const getSubjectNames = function(subjectArray) {
    return $q((resolve, reject) => {
      subjectArray.forEach((value, i) => {
        getSubjectTags(formatNames(value.name))
          .then(() => {
            if (subjectArray.length === subjectCounter) {
              resolve(albumTagArray);
            }
          });
      });
    });
  };

  const formatNames = function(subject) {
    return subject.split(' ').join('').toLowerCase();
  };

  const getSubjectTags = function(subject) {
    return $q((resolve, reject) => {
      $http.get(`app/data/pairingData.json`)
        .success((data) => {
          albumTagArray.push(data.subjectPairs[subject]);
          resolve();
          subjectCounter++
        });
    });
  };

  const getTimesNames = function(timesArray) {
    return $q((resolve, reject) => {
      timesArray.forEach((value, i) => {
        getTimesTags(formatNames(value.name))
          .then(() => {
            if (timesArray.length === placesCounter) {
              resolve(albumTagArray);
            }
          })
      })
    })
  };

  const getTimesTags = function(time) {
    return $q((resolve, reject) => {
      $http.get(`app/data/pairingData.json`)
        .success((data) => {
          albumTagArray.push(data.placesPairs[time]);
          resolve();
          placesCounter++
        })
    })
  };

  return {
    getSubjectNames, getTimesNames
  };

});