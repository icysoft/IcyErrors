"use strict";
var util = require('util');

var catMaskLength = 0xF; // 4 bits
var subCatMaskLength = 0x1F; // 5 bits
var errorMaskLength = 0xFFFF; // 16 bits

var IcyError = function (code, data, message) {
    if (IcyError.stacktrace) {
        Error.captureStackTrace(this, IcyError);
    }
    
    this.code = code || 0x0;
    this.message = message;
    this.data = data;
};
IcyError.prototype.__proto__ = Error.prototype;
util.inherits(IcyError, Error);

IcyError.catPosition = 31 - 4;
IcyError.subCatPosition = IcyError.catPosition - 5;
IcyError.errorPosition = 0;
IcyError.stacktrace = false;

IcyError.prototype.setCategory = function (catCode) {
    this.code = (this.code & ~(catMaskLength << IcyError.catPosition)) | (catCode << IcyError.catPosition);
};

IcyError.prototype.getCategory = function () {
    return  this.code >> IcyError.catPosition & catMaskLength;
};

IcyError.prototype.setSubCategory = function (subCatCode) {
    this.code = (this.code & ~(subCatMaskLength << IcyError.subCatPosition)) | (subCatCode << IcyError.subCatPosition);
};

IcyError.prototype.getSubCategory = function () {
    return  this.code >> IcyError.subCatPosition & subCatMaskLength;
};

IcyError.prototype.setError = function (errorCode) {
    this.code = (this.code & ~(errorMaskLength << IcyError.errorPosition)) | (errorCode << IcyError.errorPosition);
};

IcyError.prototype.getError = function () {
    return  this.code >> IcyError.errorPosition & errorMaskLength;
};

module.exports = IcyError;
