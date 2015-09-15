(function() {
  'use strict';

  angular
    .module('kaoqin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
