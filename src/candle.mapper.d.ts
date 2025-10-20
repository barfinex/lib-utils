import { Candle, CandleRaw } from "@barfinex/types";
export declare function toDomainCandle(raw: CandleRaw): Candle;
export declare function toRawCandle(domain: Candle): CandleRaw;
