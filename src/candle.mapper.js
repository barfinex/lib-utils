"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDomainCandle = toDomainCandle;
exports.toRawCandle = toRawCandle;
function toDomainCandle(raw) {
    return {
        open: raw.o,
        close: raw.c,
        high: raw.h,
        low: raw.l,
        volume: raw.v,
        time: raw.time,
        interval: raw.interval,
        symbol: raw.symbol,
        raw,
    };
}
function toRawCandle(domain) {
    return domain.raw;
}
//# sourceMappingURL=candle.mapper.js.map