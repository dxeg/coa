(function () {
    'use strict';

    angular.module('WASCommon', [])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;   // 发送CORS请求
            $httpProvider.defaults.withCredentials = true;  // 请求携带Cookies
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])

        .provider('RequestService', function () {
            var defaultServiceUrl = '';

            function resultProcessor(result, success, failed) {
                if(result.code === 200){
                    success(result.data);
                }else{
                    failed(result);
                }
            }

            return {
                setDefaultServiceUrl : function (url) {
                    if (url) {
                        defaultServiceUrl = url;
                    }
                },

                $get : function ($http, $q) {
                    function request(opts, processor) {
                        var d = $q.defer(),
                            url = opts.url.indexOf('http://') > -1 ? opts.url : (defaultServiceUrl + opts.url),
                            options = {
                                method : opts.method || 'GET',
                                url : url,
                                cache : false
                                // withCredentials : true
                            },
                            queryString, formData;
                        if (options.method === 'POST') {

                            formData = new FormData();

                            for(var input in opts.data){
                                formData.append(input, opts.data[input]);
                            }

                            options.data = formData;
                            //options.data = $.param(opts.data);
                            options.headers = {
                                //'Content-Type' : 'application/x-www-form-urlencoded',
                                'Content-Type' : undefined
                            };
                        } else if (options.method === 'GET') {

                            if(!opts.data) opts.data = {};
                            opts.data['__rid'] = Math.random();

                            //if (opts.data) {
                            queryString = $.param(opts.data);
                            options.url = url + (url.indexOf('?') > -1 ? '&' : '?') + queryString;
                            //}
                        }

                        processor = processor || resultProcessor;

                        try{
                            $http(options).then(function (res) {
                                processor(res.data, d.resolve, d.reject);
                            }, function (err) {
                                d.reject(err);
                            });
                        }catch(e){
                            console.log(e);
                        }

                        return d.promise;
                    }

                    return {
                        get : function (url, data, processor) {
                            if (arguments.length === 2 && typeof data === 'function') {
                                processor = data;
                                data = null;
                            }
                            return request({
                                url : url,
                                data : data
                            }, processor);
                        },

                        post : function (url, data, processor) {
                            if (typeof data === 'function' && arguments.length === 2) {
                                processor = data;
                                data = null;
                            }
                            return request({
                                method : 'POST',
                                url : url,
                                data : data
                            }, processor);
                        },

                        remove : function (url, data, processor) {
                            if (typeof data === 'function' && arguments.length === 2) {
                                processor = data;
                                data = null;
                            }
                            return request({
                                method : 'DELETE',
                                url : url,
                                data : data
                            }, processor);
                        },

                        request : request

                    };
                }
            };
        })
})();
