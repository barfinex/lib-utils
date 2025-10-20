"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = clamp;
exports.getPrecision = getPrecision;
exports.percentChange = percentChange;
exports.toFixed = toFixed;
exports.getRandomArbitrary = getRandomArbitrary;
exports.getRandomInt = getRandomInt;
exports.correctOdd = correctOdd;
exports.numberOfCharactersBeforeAndAfter = numberOfCharactersBeforeAndAfter;
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}
function getPrecision(number) {
    const s = `${Number(number)}`;
    const d = s.indexOf('.') + 1;
    return !d ? 0 : s.length - d;
}
function percentChange(current, prev) {
    return ((current - prev) / prev) * 100;
}
function toFixed(num, precision = 2) {
    const fixation = 10 ** precision;
    return Math.round((num + Number.EPSILON) * fixation) / fixation;
}
function getRandomArbitrary(min, max, odd) {
    const num = toFixed(Math.random() * (max - min) + min);
    return odd ? correctOdd(num, max) : num;
}
function getRandomInt(min, max, odd) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return odd ? correctOdd(num, max) : num;
}
function correctOdd(num, max) {
    if (num % 2 === 0) {
        if (num === max) {
            num--;
        }
        else {
            num++;
        }
    }
    return num;
}
function numberOfCharactersBeforeAndAfter(num) {
    const str = num.toString();
    if (str.indexOf('e') === -1) {
        const result = str.split('.').map(i => i.length);
        return {
            before: result[0],
            after: result[1] || 0
        };
    }
    const exponent = parseInt(str.split('-')[1], 10);
    const result = num.toFixed(exponent).split('.').map(i => i.length);
    return {
        before: result[0],
        after: result[1] || 0
    };
}
//# sourceMappingURL=math.js.map