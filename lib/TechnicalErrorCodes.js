var IcyError = require('./IcyError');

var technicalErrorCode = 1 << IcyError.catPosition;


module.exports = {
    base: technicalErrorCode,
    bdd: technicalErrorCode | 1 << IcyError.subCatPosition
};
