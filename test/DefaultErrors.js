/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var assert = require("assert");
var IcyErrors = require('..');

describe('DefaultErrors', function () {
    var ErrorsManager;
    before(function () {
        ErrorsManager = IcyErrors.ErrorsManager({moduleCode: 18});
    });

    describe('Level code', function () {
        it('should return a level FATAL error', function () {
            assert.notEqual(ErrorsManager.FATAL, void 0, "FATAL method does not exist");
            var err = ErrorsManager.FATAL(12);
            assert.deepEqual(5, err.getLevel(), "Level is not equal to 5");
        });
        it('should return a level ERROR error', function () {
            assert.notEqual(ErrorsManager.ERROR, void 0, "ERROR method does not exist");
            var err = ErrorsManager.ERROR(12);
            assert.deepEqual(4, err.getLevel(), "Level is not equal to 4");
        });
        it('should return a level WARNING error', function () {
            assert.notEqual(ErrorsManager.WARNING, void 0, "WARNING method does not exist");
            var err = ErrorsManager.WARNING(12);
            assert.deepEqual(3, err.getLevel(), "Level is not equal to 3");
        });
        it('should return a level NOTICE error', function () {
            assert.notEqual(ErrorsManager.NOTICE, void 0, "NOTICE method does not exist");
            var err = ErrorsManager.NOTICE(12);
            assert.deepEqual(2, err.getLevel(), "Level is not equal to 2");
        });
        it('should return a level DEBUG error', function () {
            assert.notEqual(ErrorsManager.DEBUG, void 0, "DEBUG method does not exist");
            var err = ErrorsManager.DEBUG(12);
            assert.deepEqual(1, err.getLevel(), "Level is not equal to 1");
        });
        it('should return a level TRACE error', function () {
            assert.notEqual(ErrorsManager.TRACE, void 0, "TRACE method does not exist");
            var err = ErrorsManager.TRACE(12);
            assert.deepEqual(0, err.getLevel(), "Level is not equal to 0");
        });
    });

    describe('Common data', function () {
        it('should return module code', function () {
            var err = ErrorsManager.FATAL(12);
            assert.deepEqual(18, err.getModule(), "Module is not equal to 18");
        });
        it('should return code', function () {
            var err = ErrorsManager.FATAL(126);
            assert.deepEqual(126, err.getCode(), "Code is not equal to 126");
        });
    });
});