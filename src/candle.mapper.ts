import { Candle, CandleRaw } from "@barfinex/types";

/**
 * Конвертация raw → domain.
 */
export function toDomainCandle(raw: CandleRaw): Candle {
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

/**
 * Конвертация domain → raw.
 */
export function toRawCandle(domain: Candle): CandleRaw {
    return domain.raw;
}
