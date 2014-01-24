'use strict';

angular.module('nApp')
  .controller('MainCtrl', function ($scope, ws) {
    $scope.infoFromDB = '';
    $scope.getInfoFromDB = function () {
      ws.MongoDbInfo()
        .success(function (data) {
          $scope.infoFromDB = data;
        }).
      error(function (data, status) {
        $scope.infoFromDB = 'Failed to get information about MongoDB. An error: ' + status;
      });
    };


  });