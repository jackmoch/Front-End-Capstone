'use strict';

app.factory('albumFactory', function($q, $http) {

  const getAlbums = function(tag) {
    return $q((resolve, reject) => {
      $http.get(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${tag}&api_key=e3467c060349989a71ceaba31492004e&format=json`)
        .success((albums) => {
          console.log("", albums.albums.album);
        })
    })
  }

  const callGetAlbum = function(uniqueTagArray) {
    return $q((resolve, reject) => {
      uniqueTagArray.forEach((value, i) => {
        getAlbums(value);
      });
    })
  };

  return {
    getAlbums, callGetAlbum
  }

});