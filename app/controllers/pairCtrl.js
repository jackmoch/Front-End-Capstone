'use strict';

app.controller('pairCtrl', function($scope, bookFactory, $rootScope, pairFactory, albumFactory, authFactory, dataFactory) {

  $scope.album = false;
  $scope.selectedBook = null;
  $scope.currentAlbumArray = [];
  $scope.user = false;
  let counter = 0;

  $scope.pair = function() {
    $scope.selectedBook = bookFactory.getSelectedBook();
    pairFactory.getSubjectNames($scope.selectedBook.subjects)
      .then((albumTagArray) => {
        albumFactory.callGetAlbum($scope.removeDuplicates(albumTagArray))
          .then((albumArray) => {
            $scope.currentAlbumArray = [];
            for (let i = 0; i < albumArray.length; i++) {
              $scope.currentAlbumArray.push(albumArray[i]);
            }
            $scope.album = true;
            $scope.setCurrentAlbum(0);
            $scope.user = authFactory.getUser();
            // $scope.currentAlbum = $scope.currentAlbumArray[0];
            // $scope.currentAlbumImage = $scope.currentAlbumArray[0].image[2][Object.keys($scope.currentAlbumArray[0].image[2])[0]];
            // console.log("", $scope.currentAlbumImage);
            // console.log("", albumArray);
            // console.log("first test array", $scope.currentAlbumArray);
            // let newTestArray = $scope.currentAlbumArray.sort(function() {
            //   console.log("test counter in sort");
            //   return 0.5 - Math.random()
            // });
            // console.log("second test array", $scope.currentAlbumArray);
            // console.log("new test array", newTestArray);
          });
      });
  };

  $scope.changeCurrentAlbum = function() {
    counter++
    if (counter >= $scope.currentAlbumArray.length) {
      counter = 0
    };
    $scope.setCurrentAlbum(counter)
  }

  $scope.setCurrentAlbum = function(index) {
    $scope.currentAlbum = $scope.currentAlbumArray[index];
    $scope.currentAlbumImage = $scope.currentAlbumArray[index].image[2][Object.keys($scope.currentAlbumArray[0].image[3])[0]];
  }

  $scope.removeDuplicates = function(albumTagArray) {
    return albumTagArray.filter(function(elem, index, self) {
      return index == self.indexOf(elem) && elem !== undefined;
    });
  };

  $scope.buildFavoriteObject = function() {
    let selectedBook = bookFactory.getSelectedBook();
    let uid = authFactory.getUser();
    let favoriteObject = {
      bookAuthor: selectedBook.authors[0].name,
      bookCover: selectedBook.cover.large,
      bookTitle: selectedBook.title,
      albumArtist: $scope.currentAlbum.artist.name,
      albumName: $scope.currentAlbum.name,
      albumImage: $scope.currentAlbumImage,
      uid: uid
    }
    dataFactory.postData(favoriteObject);
  };

  // $scope.shuffle = function(a) {
  //   var j, x, i;
  //   for (i = a.length; i; i--) {
  //     j = Math.floor(Math.random() * i);
  //     console.log("j", j);
  //     x = a[i - 1];
  //     console.log("x", x);
  //     a[i - 1] = a[j];
  //     console.log("a[j]", a[j]);
  //     a[j] = x;
  //   }
  // }



  //   $scope.shuffle = function(array) {
  //   var currentIndex = array.length, temporaryValue, randomIndex;

  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {

  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }

  //   return array;
  // }

  // $scope.shuffle = function(array) {
  //   let temp = [];
  //   for (var i = array.length; i > 0; i--) {
  //     var j = Math.floor(Math.random() * (i + 1));
  //     temp[j] = array[i];
  //     // temp.push(array[j]);
  //   }
  //   return temp;
  // }
});

// array sort method