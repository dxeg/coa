(function() {
  'use strict';

  angular
    .module('kaoqin')
    .controller('MainIndexController', MainIndexController);

  /** @ngInject */
  function MainIndexController($scope, RequestService, $timeout, toastr) {

      $scope.year = 2015;

      var yearData = [1,2,3,4,5,6,7,8,9,10,11,12].map(function (r) {
          return {year : $scope.year,month : r};
      });

      RequestService.get(['records', $scope.year].join('/')).then(function (result) {
          result.forEach(function (r) {
              angular.merge(yearData[r.month - 1],r);
          });
          $scope.yearData = yearData;
      }, function (err) {
          toastr.error(err);
      });


        $scope.coaYear = [
            {
                year : $scope.year,
                days : 200
            }
        ];

      $scope.fileUpload = function () {
          RequestService.post(['records', 'upload'].join('/'), $scope.upload).then(function () {
              toastr.success("ok");
          }, function (err) {
              toastr.error(err);
          });
      };

  }
})();
