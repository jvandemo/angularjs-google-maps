'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('gm', function() {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('gm');
        dependencies = module.requires;
    });

    it('should load config module', function() {
        expect(hasModule('gm.config')).toBeTruthy();
    });

    it('should load filters module', function() {
        expect(hasModule('gm.filters')).toBeTruthy();
    });

    it('should load directives module', function() {
        expect(hasModule('gm.directives')).toBeTruthy();
    });

    it('should load services module', function() {
        expect(hasModule('gm.services')).toBeTruthy();
    });

    it('should load places module', function() {
        expect(hasModule('gm.places')).toBeTruthy();
    });


});
