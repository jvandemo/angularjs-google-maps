'use strict';

describe('Logger service', function () {

    var logger;

    beforeEach(module('gm'));

    beforeEach(inject(['$injector', function ($injector) {

        // Create logger
        logger = $injector.get('logger');
    }]));

    it('should exist', function() {
        expect(logger).toBeDefined();
    });

});
