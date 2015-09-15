(function() {
  'use strict';

  angular
    .module('kaoqin')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'app/routers/login/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'app/routers/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .state('main.index', {
            url: '/index',
            controller: 'MainIndexController',
            templateUrl: 'app/routers/main/index/index.html'
        });

    $urlRouterProvider.otherwise('/');
  }

})();
