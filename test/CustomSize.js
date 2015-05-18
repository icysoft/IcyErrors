var assert = require("assert");
var IcyErrors = require('..');

describe('CustomSize', function () {
    var ErrorsManager;
    before(function () {
        ErrorsManager = IcyErrors.ErrorsManager(
                {
                    moduleCode: 18,
                    totalBits: 26,
                    levelBits: 7,
                    moduleBits: 8
                });
    });

    it('should return module code', function () {
        var err = ErrorsManager.FATAL(12);
        assert.deepEqual(18, err.getModule(), "Module is not equal to 18");
    });
    it('should return code', function () {
        var err = ErrorsManager.FATAL(126);
        assert.deepEqual(126, err.getCode(), "Code is not equal to 126");
    });

});