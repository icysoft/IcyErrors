var assert = require("assert");
var IcyErrors = require('..');

describe('CustomLevels', function () {
    var ErrorsManager;
    before(function () {
        ErrorsManager = IcyErrors.ErrorsManager(
                {
                    moduleCode: 18,
                    levels: {
                        'TEST_01': 0,
                        'TEST_02': 1
                    }
                });
    });

    describe('Level code', function () {
        it('should return a level TEST_01 error', function () {
            assert.notEqual(ErrorsManager.TEST_01, void 0, "TEST_01 method does not exist");
            var err = ErrorsManager.TEST_01(12);
            assert.deepEqual(0, err.getLevel(), "Level is not equal to 0");
        });
        it('should return a level TEST_02 error', function () {
            assert.notEqual(ErrorsManager.TEST_02, void 0, "TEST_02 method does not exist");
            var err = ErrorsManager.TEST_02(12);
            assert.deepEqual(1, err.getLevel(), "Level is not equal to 1");
        });
    });

});