var IcyError = require('./IcyError');

var logicErrorCode = 2 << IcyError.catPosition;


module.exports = {
    base: logicErrorCode
};
