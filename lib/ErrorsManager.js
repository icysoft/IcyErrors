/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var util = require('util');

function ErrorsManager() {
}

function initErrorsManager() {


    // Init errors levels function
    Object.keys(ErrorsManager.levels).forEach(function (level) {
        var levelCode = ErrorsManager.levels[level];
        ErrorsManager.prototype[level] = function (detailsCode, data, message) {
            return new IcyError(
                    0x0 |
                    levelCode << ErrorsManager.levelPosition |
                    ErrorsManager.moduleCode << ErrorsManager.modulePosition |
                    detailsCode
                    , data, message);
        };
    });
}

// Init Error object
var IcyError = function (code, data, message) {
    if (ErrorsManager.stacktrace) {
        Error.captureStackTrace(this, IcyError);
    }
    this.code = code;
    this.message = message;
    this.data = data;
};
IcyError.prototype.__proto__ = Error.prototype;
util.inherits(IcyError, Error);

IcyError.prototype.getLevel = function () {
    return  this.code >> ErrorsManager.levelPosition & ((1 << ErrorsManager.levelBits) - 1);
};

IcyError.prototype.getModule = function () {
    return  this.code >> ErrorsManager.modulePosition & ((1 << ErrorsManager.moduleBits) - 1);
};

IcyError.prototype.getCode = function () {
    return  this.code >> 0 & ((1 << ErrorsManager.codeBits) - 1);
};

var aux = module.exports;

aux.error = IcyError;

aux.manager = function (options) {
    if (!options || !options.moduleCode) {
        return new Error('You need at least a moduleCode option');
    }
    // Identifies the module
    ErrorsManager.moduleCode = options.moduleCode;
    // Error code total bits
    ErrorsManager.totalBits = options.codeBits || 31;
    // Level reserved bits
    ErrorsManager.levelBits = options.levelBits || 3;
    // Module reserved bits
    ErrorsManager.moduleBits = options.moduleBits || 8;
    // Error levels to generate
    ErrorsManager.levels = options.levels ||
            {
                'TRACE': 0,
                'DEBUG': 1,
                'NOTICE': 2,
                'WARNING': 3,
                'ERROR': 4,
                'FATAL': 5
            };
    // Position of the level code
    ErrorsManager.levelPosition = ErrorsManager.totalBits - ErrorsManager.levelBits;
    // Position of the module code
    ErrorsManager.modulePosition = ErrorsManager.levelPosition - ErrorsManager.moduleBits;
    // Position of the simple code
    ErrorsManager.codeBits = ErrorsManager.totalBits - ErrorsManager.levelBits - ErrorsManager.moduleBits;
    // Must manage trace ?
    ErrorsManager.stacktrace = options.stacktrace || process.env.NODE_ENV === 'development';

    initErrorsManager();

    return new ErrorsManager();
};
