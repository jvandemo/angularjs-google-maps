angular.module('gm.places')
    .directive('gmPlacesAutocomplete', ['$window', 'gm.config', function($window, gmConfig){

        var configOptions = (gmConfig.places && gmConfig.places.autocomplete) || {};

        console.log('Using config options', configOptions);

        return {
            restrict: 'AEC',
            require : ['gmPlacesAutocomplete', '?ngModel'],
            controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude){

                // Assemble options
                var options = angular.extend({}, configOptions, $scope.$eval($attrs.gmOptions));

                var element = $element[0];

                this._autocomplete = undefined;

                Object.defineProperties(this, {
                    api: {
                        get: function(){
                            return this._autocomplete;
                        }
                    }
                });

                try {
                    this._autocomplete = new google.maps.places.Autocomplete(element);
                }
                catch (err)
                {
                    if(gmConfig.debug) console.log('Could not instantiate autocomplete directive: ' + err.message);
                }

            }],
            link: function(scope, iElement, iAttrs, controllers){

                // Define controllers
                var gmPlacesAutocompleteController = controllers[0];
                var ngModelController = controllers[1];

                // Update model if there is one
                if (ngModelController) {
                    ngModelController.$setViewValue(gmPlacesAutocompleteController);
                }
            }
        };

    }]);