(function () {
    'use strict';
    angular.module('WASData')
        .factory('requestInterceptor', function () {
            return {
                request : function (config) {
                    return config;
                },
                response : function (response) {
                    return response;
                },
                requestError : function (config) {
                    return config;
                },
                responseError : function (data) {
                    return data;
                }
            }
        }).config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('requestInterceptor');
        }])
})();
