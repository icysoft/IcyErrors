var util = require('util');

function ErrorsManager() {
}

function initErrorsManager() {
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

module.exports = function (options) {
    if (!options || !options.moduleCode) {
        console.error('You need at least a moduleCode option');
    }
    ErrorsManager.moduleCode = options.moduleCode;
    ErrorsManager.totalBits = options.codeBits || 31;
    ErrorsManager.levelBits = options.levelBits || 3;
    ErrorsManager.moduleBits = options.moduleBits || 8;
    ErrorsManager.levels = options.levels ||
            {
                'TRACE': 0,
                'DEBUG': 1,
                'NOTICE': 2,
                'WARNING': 3,
                'ERROR': 4,
                'FATAL': 5
            };
    ErrorsManager.levelPosition = ErrorsManager.totalBits - ErrorsManager.levelBits;
    ErrorsManager.modulePosition = ErrorsManager.levelPosition - ErrorsManager.moduleBits;
    ErrorsManager.codeBits = ErrorsManager.totalBits - ErrorsManager.levelBits - ErrorsManager.moduleBits;

    ErrorsManager.stacktrace = options.stacktrace || false;

    initErrorsManager();

    return new ErrorsManager();
};
