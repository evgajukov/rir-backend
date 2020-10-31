"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
function catchError(fn, io) {
    if (io) {
        return (req, res, next) => {
            fn(req, res, io).catch(next);
        };
    }
    return (req, res, next) => fn(req, res).catch(next);
}
exports.catchError = catchError;
