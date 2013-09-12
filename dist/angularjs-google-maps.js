(function(window, document) {

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('gm.config', [])
    .value('gm.config', {
        debug: true,
        placess: {
            autocomplete: {}
        }
    })
    .run(['$window', function($window){

        // Check for dependencies
        if(
            angular.isUndefined($window.google) ||
            angular.isUndefined($window.google.maps)
            ){
            throw new Error('Google Maps API not available, please make sure the Google Maps library is loaded before the AngularJS Google Maps library is loaded');
        }
    }]);

// Places modules
angular.module('gm.places.directives', []);
angular.module('gm.places', [
    'gm.places.directives'
])
    .run(['$window', function($window){

        // Check for dependencies
        if(
            angular.isUndefined($window.google) ||
            angular.isUndefined($window.google.maps) ||
            angular.isUndefined($window.google.maps.places) ||
            angular.isUndefined($window.google.maps.places.Autocomplete)
            ){
            throw new Error('Google Maps API not available, please make sure the Google Maps library is loaded before the AngularJS Google Maps library is loaded');
        }
    }]);

// Modules
angular.module('gm.directives', []);
angular.module('gm.filters', []);
angular.module('gm.services', []);
angular.module('gm', [
    'gm.config',
    'gm.directives',
    'gm.filters',
    'gm.services',
    'gm.places'
]);
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

    }]);})(window, document);