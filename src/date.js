"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameDay = isSameDay;
exports.isWeekend = isWeekend;
exports.toIsoString = toIsoString;
exports.getWeekDay = getWeekDay;
exports.intervalToMs = intervalToMs;
const types_1 = require("@barfinex/types");
function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}
function isWeekend(d) {
    d = new Date(d);
    const day = d.getDay();
    return day === 6 || day === 0;
}
function toIsoString(date) {
    date = new Date(date);
    const tzo = -date.getTimezoneOffset(), dif = tzo >= 0 ? '+' : '-', pad = function (num) {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return (date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes()) +
        ':' +
        pad(date.getSeconds()) +
        '.' +
        '000000' +
        dif +
        pad(tzo / 60) +
        ':' +
        pad(tzo % 60));
}
function getWeekDay(stamp) {
    const days = stamp / 86400000;
    const day_of_week = (days + 4) % 7;
    return Math.floor(day_of_week);
}
function intervalToMs(interval) {
    let time = 0;
    switch (interval) {
        case types_1.TimeFrame.min1:
            time = 1;
            break;
        case types_1.TimeFrame.min5:
            time = 5;
            break;
        case types_1.TimeFrame.min15:
            time = 15;
            break;
        case types_1.TimeFrame.min30:
            time = 30;
            break;
        case types_1.TimeFrame.h1:
            time = 60;
            break;
        case types_1.TimeFrame.h4:
            time = 240;
            break;
        case types_1.TimeFrame.day:
            time = 1440;
            break;
    }
    if (!time) {
        throw new Error('Unsupported interval');
    }
    return time * 60 * 1000;
}
//# sourceMappingURL=date.js.map