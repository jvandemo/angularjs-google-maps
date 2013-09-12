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
