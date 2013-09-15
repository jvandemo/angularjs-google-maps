angular.module('gm.places')
    .directive('gmPlacesAutocomplete', ['$rootScope', 'gm.config', 'logger', function($rootScope, gmConfig, logger){

        var configOptions = (gmConfig.places && gmConfig.places.autocomplete) || {};

        return {
            restrict: 'AEC',
            require : ['gmPlacesAutocomplete', '?ngModel'],
            controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude){

                this._options = angular.extend({}, configOptions, $scope.$eval($attrs.gmOptions));
                this._element = $element[0];
                this._api = undefined;

                // Define properties
                Object.defineProperties(this, {
                    element: {
                        get: function(){
                            return this._element;
                        },
                        configurable: false
                    },
                    api: {
                        get: function(){
                            return this._api;
                        },
                        configurable: false
                    }
                });

                try {
                    this._api = new google.maps.places.Autocomplete(this._element, this._options);
                }
                catch (err)
                {
                    if(gmConfig.debug) logger.log('Could not instantiate gmPlacesAutocomplete directive: ' + err.message);
                }

            }],
            link: function(scope, iElement, iAttrs, controllers){

                // Define controllers
                var gmPlacesAutocompleteController = controllers[0];
                var ngModelController = controllers[1];

                // Set initial model value if a model is defined
                if (ngModelController) {
                    ngModelController.$setViewValue(gmPlacesAutocompleteController.api);
                }

                // Listen to place_changed event
                google.maps.event.addListener(gmPlacesAutocompleteController.api, 'place_changed',
                    (function(scope, iElement, iAttrs, gmPlacesAutocompleteController, ngModelController, $rootScope){
                        return function(){

                            // Update model if there is one
                            if (ngModelController) {
                                ngModelController.$setViewValue(gmPlacesAutocompleteController.api);
                            }

                            // Broadcast event
                            $rootScope.$broadcast('gmPlacesAutocomplete::placeChanged', gmPlacesAutocompleteController);
                        };
                    })(scope, iElement, iAttrs, gmPlacesAutocompleteController, ngModelController, $rootScope)
                );

            }
        };

    }]);