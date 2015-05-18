var IcyError = require('./IcyError');

var unknownErrorCode = 15 << IcyError.catPosition;


module.exports = {
    base: unknownErrorCode
};
