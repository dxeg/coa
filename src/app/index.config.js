(function() {
  'use strict';

  angular
    .module('kaoqin')
    .config(config);

  /** @ngInject */
  function config($logProvider, RequestServiceProvider, toastr) {
    // Enable log
    $logProvider.debugEnabled(true);

      RequestServiceProvider.setDefaultServiceUrl('http://10.10.23.87:3000/');


    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
  }

})();
