'use strict';

app.factory('albumFactory', function($q, $http) {

  let albumArray = [],
    counter = 0;

  const getAlbums = function(tag) {
    return $q((resolve, reject) => {
      $http.get(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${tag}&limit=10&api_key=e3467c060349989a71ceaba31492004e&format=json`)
        .success((albums) => {
          resolve(albums.albums.album);
          counter++;
        })
    })
  }

  const callGetAlbum = function(uniqueTagArray) {
    return $q((resolve, reject) => {
      uniqueTagArray.forEach((value, i) => {
        getAlbums(value)
          .then((albums) => {
            albumArray = albumArray.concat(albums);
            if (uniqueTagArray.length === counter) {
              resolve(albumArray);
            }
          });
      })
    })
  }

  return {
    getAlbums, callGetAlbum
  }

});