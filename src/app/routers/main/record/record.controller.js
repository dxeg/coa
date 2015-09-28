(function() {
  'use strict';

  angular
    .module('kaoqin')
    .controller('MainRecordController', MainRecordController)
    .controller('MainRecordModalController', MainRecordModalController);

    /** @ngInject */
    function MainRecordController($scope, $stateParams, $modal, $log, RequestService, toastr) {
        $scope.params = $stateParams;
        var getData = function () {
            RequestService.get(['records', $stateParams.year, $stateParams.month].join('/')).then(function(result) {
                $scope.monthData = result;
            }, function (err) {
                toastr.error(err);
            });
        };

        getData();
      $scope.open = function (date) {
          var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'app/routers/main/record/modal.html',
              size: 'lg',
              controller: 'MainRecordModalController',
              resolve: {
                  date: function () {
                      return date;
                  }
              }
          });

          modalInstance.result.then().finally(function () {
              getData();
          });
      };


  }

    function MainRecordModalController($scope, $modalInstance, RequestService, date, toastr, DateUtil){
        $scope.date = date.replace(/-/g,'/');

        var getData = function () {
            RequestService.get("records/" + $scope.date).then(function(result) {
                $scope.dayData = result.map(function (r) {
                    r.hour = DateUtil.format(r.time, 'hh:mm:ss');
                    return r;
                });
            }, function (err) {
                toastr.error(err);
            });
        };
        getData();

        $scope.cancel = function () {
            $modalInstance.close();
        };

        $scope.delRecord = function (time) {
            if(confirm('是否要删除这条记录？')){
                RequestService.remove("records/" + $scope.date + "/" + time)
                    .then(function () {
                        toastr.success('删除成功');
                        getData();
                    }, function (err) {
                        toastr.error(err);
                    });
            }
        };

        var today = new Date();
        today.setHours(9);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        $scope.rec = {
            time : today
        };

        $scope.addRecord = function () {
            $scope.rec.time = DateUtil.format($scope.rec.time, 'hh:mm:ss');
            RequestService.post("records/" + $scope.date, $scope.rec).then(function () {
                toastr.success('添加成功');
                getData();
            }, function (err) {
                toastr.error(err);
            });
        };
    }
})();
