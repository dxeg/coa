(function() {
  'use strict';

  angular
    .module('kaoqin')
    .controller('MainIndexController', MainIndexController);

  /** @ngInject */
  function MainIndexController($timeout, toastr) {
        $scope.coaYear = [
            {
                year : '2014'
            },{
                year : '2015'
            }
        ]
  }
})();
