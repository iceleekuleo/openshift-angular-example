'use strict';

angular.module('nApp')
  .controller('MainCtrl', function ($scope,ws) {
    $scope.getInfoFromDB = function () {
      ws.MongoDbInfo()
        .success(function (data) {
          window.alert(JSON.stringify(data));
        }).
      error(function (data, status) {
        window.alert('Failed to get information about MongoDB. An error: ' + status);

      });
    };
  });