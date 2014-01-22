'use strict';

angular.module('nApp')
  .factory('ws', function ($http) {
    return {
      MongoDbInfo: function () {
        return $http({
          method: 'GET',
          url: 'http://' + 'localhost' + ':3000' + '/info',
          timeout: 300,
          cache: false
        });
      }
    };
  });