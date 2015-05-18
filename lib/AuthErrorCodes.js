var IcyError = require('./IcyError');

var catCode = 3;

var authErrorCode = catCode << IcyError.catPosition;


module.exports = {
    code: catCode,
    base: authErrorCode
};
