import { TimeFrame } from '@barfinex/types';
export declare function isSameDay(d1: Date, d2: Date): boolean;
export declare function isWeekend(d: string | number | Date): boolean;
export declare function toIsoString(date: Date | number | string): string;
export declare function getWeekDay(stamp: number): number;
export declare function intervalToMs(interval: TimeFrame): number;
