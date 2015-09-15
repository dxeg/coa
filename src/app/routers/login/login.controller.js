(function() {
  'use strict';

  angular
    .module('kaoqin')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $rootScope, $state, $timeout, toastr) {

      $scope.submit = function () {
          if($scope.sub_form.$invalid){
              $scope.sub_form.$submitted = false;
          }
          $rootScope.user = {
              email : $scope.sub_form.email
          };
          toastr.success('login succss');
          $timeout(function () {
              $state.go('main');
          },1000);

      };
  }
})();
