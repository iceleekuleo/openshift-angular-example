'use strict';

angular.module('nApp')
  .factory('ws', function ($http) {
    return {
      MongoDbInfo: function () {
        return $http({
          method: 'GET',
          url: '/info',
          timeout: 3000,
          cache: false
        });
      }
    };
  });