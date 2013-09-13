describe('Autocomplete directive', function () {

    var scope,
        $rootScope,
        $compile,
        element;

    beforeEach(module('gm'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    beforeEach(function () {
        scope = $rootScope.$new();
    });

    function createDirective(gmOptions) {
        scope.autocompleteModel = undefined;
        scope.gmOptions = gmOptions || {};
        element = $compile('<div><input type="text" gm-places-autocomplete="gmOptions" ng-model="autocompleteModel" /></div>')(scope);
    }

    it('should create a scope model', function () {
        createDirective();
        expect(scope.autocompleteModel).toBeDefined();
    });

    it('should assign an api property to the scope model', function () {
        createDirective();
        expect(scope.autocompleteModel.api).toBeDefined();
    });

    it('should have an api that is an instance of google.maps.places.Autocomplete', function () {
        createDirective();
        expect(scope.autocompleteModel.api instanceof google.maps.places.Autocomplete).toBeTruthy();
    });

});