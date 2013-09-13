/**
 * Logger service
 */
angular.module('gm.services')
    .factory('logger', ['$log', '$window', function ($log, $window) {

        // Create service
        var service = {};

        // Proxy regular methods to $log
        angular.forEach(['log', 'info', 'warn', 'error'], function(method){
            service[method] = function(){
                return $log[method](arguments);
            };
        });


        // Add dir method to hierarchically display objects
        service.dir = function (obj, title) {
            if ($window.console) {
                if (angular.isDefined(title)) {
                    $log.info(title + ':');
                }
                $window.console.dir(obj);
            }
        };

        return service;
    }]);