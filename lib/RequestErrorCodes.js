var IcyError = require('./IcyError');

var requestErrorCode = 2 << IcyError.catPosition;


module.exports = {
    base: requestErrorCode,
    missingParameter: requestErrorCode | 1 << IcyError.subCatPosition,
    invalidParameterType: requestErrorCode | 2 << IcyError.subCatPosition,
    parameterValueNotAllowed: requestErrorCode | 3 << IcyError.subCatPosition,
    parameterValueOutOfRange: requestErrorCode | 4 << IcyError.subCatPosition,
    parameterLengthOutOfRange: requestErrorCode | 5 << IcyError.subCatPosition,
    parameterFormatNotAllowed: requestErrorCode | 6 << IcyError.subCatPosition,
};
