# AngularJS Google Maps

AngularJS library for working with Google Maps.

Unlike other Google Maps libraries, this library is heavily focused on providing **easy-to-use AngularJS directives** that require little to no programming knowledge.

## Install the library

Download the code from this repository or use [Bower](http://bower.io):

    bower install angularjs-google-maps

## Include it in your app

Make sure to load the AngularJS library and the Google Maps API:

    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min.js"></script>
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>

Then load the AngularJS Google Maps library:

    <script src="bower/angularjs-google-maps/dist/angularjs-google-maps.js"></script>

Finally add the `gm` module as a dependency to your AngularJS app:

    angular.module('yourApp', ['gm']);

That's it! You can now start adding Google Maps directives to your markup.

## The Google Maps Places Autocomplete directive

The `gmPlacesAutocomplete` directive turns an input into an input that listens for user input and provides place predictions based on the input.

### The markup

    <input type="text" gm-places-autocomplete="autocompleteOptions" ng-model="autocompleteModel" />

- *autocompleteOptions*: optional, options you wish to pass to the [`google.maps.places.Autocomplete`](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#Autocomplete) service. See the [`AutocompleteOptions` specifications](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#AutocompleteOptions) for a [complete list of available options](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#AutocompleteOptions).
- *autocompleteModel*: optional, name of the model you wish to assign the resulting [`google.maps.places.Autocomplete`](https://developers.google.com/maps/documentation/javascript/reference?hl=nl#Autocomplete) object to

### The controller

When the place changes, a `gmPlacesAutocomplete::placeChanged` event is broadcasted:

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

### Demo

- [Places autocomplete demo page](https://github.com/jvandemo/angularjs-google-maps/tree/master/demo/places) in the demo directory
- [Extract lat and lng from an autocomplete input](http://plnkr.co/edit/iHa94x38uMd8VkBs148D?p=preview) on Plnkr

## Roadmap

Currently working on a set of easy-to-use hierarchical directives that allow a user to build a map semantically like this in pure markup:

    <!-- Draw map -->
    <gm-map>
    
        <!-- Add marker to map -->
        <gm-marker="{lat: x, lng: y}">
        
            <!-- Draw a circle around the marker -->
            <gm-circle="{radius: 1000}"></gm-circle>
            
            <!-- Show an infoWindow when marker is clicked -->
            <gm-info-window>
                Content of the info window
            </gm-info-window>
            
        </gm-marker>
        
        <!-- Add second marker to map -->
        <gm-marker="{lat: x2, lng: y2}"></gm-marker>
        
        <!-- Add third marker to map -->
        <gm-marker="{lat: x3, lng: y3}"></gm-marker>
        
    </gm-map>

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

### 0.4.0

- Added installation instructions to readme
- Registered with Bower
- Added live demo on plnkr
- Added roadmap
