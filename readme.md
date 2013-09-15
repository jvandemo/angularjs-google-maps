# AngularJS Google Maps

AngularJS library for working with Google Maps.

Unlike other Google Maps libraries, this library is heavily focused on providing **easy-to-use AngularJS directives** that require little to no programming knowledge.

## Places Autocomplete directive

The `gmPlacesAutocomplete` directive turns an input into an input that listens for user input and provides place predictions based on the input:

    <input type="text" gm-places-autocomplete="autocompleteOptions" ng-model="autocompleteModel" />

- *autocompleteOptions*: optional, options you wish to pass to the [`google.maps.places.Autocomplete`](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#Autocomplete) service. See the [`AutocompleteOptions` specifications](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#AutocompleteOptions) for a [complete list of available options](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#AutocompleteOptions).
- *autocompleteModel*: optional, name of the model you wish to assign the resulting [`google.maps.places.Autocomplete`](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#Autocomplete) object to

When the place changes, a `gmPlacesAutocomplete::placeChanged` event is broadcasted.

Example controller:

    angular.module('places', ['gm'])
        .controller('placesAutocompleteCtrl', ['$scope', function($scope){

            // Define options
            $scope.autocompleteOptions = {};

            // Listen to change event
            $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
              console.log('Place has changed');
            });

        }]);

The model provides access to the [`google.maps.places.Autocomplete`](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#Autocomplete) service API so you can do things like:

    // Listen to change event
    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){

        // Get place
        console.dir(autocompleteModel.getPlace());

        // Get bounds
        console.dir(autocompleteModel.getBounds());

    });


Check out the [Autocomplete documentation](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#Autocomplete) for a [complete list of available methods](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#Autocomplete).

There is also a [places autocomplete demo](https://github.com/jvandemo/angularjs-google-maps/tree/master/demo/places) available in the `demo` directory.

## Change log

### 0.1.0

- Added gmPlacesAutocomplete directive

### 0.2.0

- Added logger service
- Updated gmPlacesAutocomplete directive to use logger service

### 0.2.1

- Added options to gmPlacesAutocomplete directive
- Added unit tests for event broadcasting

### 0.3.0

- Updated gmPlacesAutocomplete directive to immediately assign original Google API to model

### 0.3.1

- Updated gmPlacesAutocomplete linking function to use public api of controller