/**
 * Created by ligj on 2015/7/20.
 */

(function() {
    'use strict';

    angular
        .module('kaoqin')
        .directive('uploadFile',uploadFile);
        
        function uploadFile ($timeout) {
            return {
                restrict : 'EA',
                scope : {
                    model : '=ngModel'
                },
                controller : function ($scope, $element, $attrs) {

                },
                link : function ($scope, $element) {
                    $element.on("change", function (e) {
                        e = e || window.event;
                        $timeout(function () {
                            $scope.model = e.target.files[0];
                        });
                    });
                }
            };
        }
        
})();
