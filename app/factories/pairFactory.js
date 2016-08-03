'use strict';

app.factory('pairFactory', function($q, $http) {

  let albumTagArray = [];

  const getSubjectNames = function(subjectArray) {
    return $q((resolve, reject) => {
      subjectArray.forEach((value, i) => {
        getAlbumTags(formatSubjectNames(value.name))
          .then(() => {
            if (subjectArray.length - 1 === i) {
              resolve(albumTagArray);
            }
          });
      });
    });
  };

  const formatSubjectNames = function(subject) {
    return subject.split(' ').join('').toLowerCase();
  };

  const getAlbumTags = function(subject) {
    return $q((resolve, reject) => {
      $http.get(`app/data/pairingData.json`)
        .success((data) => {
          albumTagArray.push(data.genrePairs[subject]);
          resolve();
        });
    });
  };

  return {
    getSubjectNames
  };

});