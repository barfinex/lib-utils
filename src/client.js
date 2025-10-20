"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.httpClient = void 0;
exports.isAccountEvent = isAccountEvent;
exports.isOrder = isOrder;
exports.isOrderBook = isOrderBook;
exports.isTrade = isTrade;
exports.isSymbolPriceArray = isSymbolPriceArray;
const types_1 = require("@barfinex/types");
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("redis");
function isAccountEvent(value) {
    return (value &&
        typeof value.eventType === 'string' &&
        typeof value.eventTime === 'number' &&
        typeof value.options === 'object');
}
function isOrder(value) {
    return (value &&
        (typeof value.symbol === 'object' ?
            typeof value.symbol.name === 'string' &&
                (typeof value.symbol.leverage === 'number' || value.symbol.leverage === undefined) &&
                (typeof value.symbol.quantity === 'number' || value.symbol.quantity === undefined)
            : value.symbol === undefined) &&
        (typeof value.id === 'string' || value.id === undefined) &&
        (typeof value.externalId === 'string' || value.externalId === undefined) &&
        (value.side === undefined || Object.values(types_1.OrderSide).includes(value.side)) &&
        (value.type === undefined || Object.values(types_1.OrderType).includes(value.type)) &&
        (typeof value.price === 'number' || value.price === undefined) &&
        (typeof value.time === 'number' || value.time === undefined) &&
        (typeof value.updateTime === 'number' || value.updateTime === undefined) &&
        (typeof value.quantity === 'number' || value.quantity === undefined) &&
        (typeof value.quantityExecuted === 'number' || value.quantityExecuted === undefined) &&
        typeof value.useSandbox === 'boolean' &&
        (typeof value.priceClose === 'number' || value.priceClose === undefined) &&
        Object.values(types_1.ConnectorType).includes(value.connectorType) &&
        Object.values(types_1.MarketType).includes(value.marketType) &&
        typeof value.source === 'object' &&
        Object.values(types_1.OrderSourceType).includes(value.source.type) &&
        typeof value.source.key === 'string' &&
        typeof value.source.restApiUrl === 'string' &&
        (typeof value.leverage === 'number' || value.leverage === undefined));
}
function isOrderBook(value) {
    return (value &&
        Array.isArray(value.bids) &&
        value.bids.every((bid) => typeof bid.price === 'number' &&
            typeof bid.volume === 'number') &&
        Array.isArray(value.asks) &&
        value.asks.every((ask) => typeof ask.price === 'number' &&
            typeof ask.volume === 'number') &&
        typeof value.symbol === 'object' &&
        typeof value.symbol.name === 'string' &&
        (typeof value.symbol.leverage === 'number' || value.symbol.leverage === undefined) &&
        (typeof value.symbol.quantity === 'number' || value.symbol.quantity === undefined) &&
        typeof value.time === 'number');
}
function isTrade(value) {
    return (value &&
        typeof value.time === 'number' &&
        typeof value.symbol === 'object' &&
        typeof value.symbol.name === 'string' &&
        (typeof value.symbol.leverage === 'number' || value.symbol.leverage === undefined) &&
        (typeof value.symbol.quantity === 'number' || value.symbol.quantity === undefined) &&
        typeof value.price === 'number' &&
        typeof value.volume === 'number' &&
        (value.side === types_1.TradeSide.LONG || value.side === types_1.TradeSide.SHORT));
}
function isSymbolPriceArray(value) {
    return (Array.isArray(value) &&
        value.every((item) => typeof item.e === 'string' &&
            typeof item.E === 'number' &&
            typeof item.s === 'string' &&
            typeof item.p === 'string' &&
            typeof item.P === 'string' &&
            typeof item.o === 'string' &&
            typeof item.h === 'string' &&
            typeof item.l === 'string' &&
            typeof item.c === 'string' &&
            typeof item.w === 'string' &&
            typeof item.v === 'string' &&
            typeof item.q === 'string' &&
            typeof item.O === 'number' &&
            typeof item.C === 'number' &&
            typeof item.F === 'number' &&
            typeof item.L === 'number' &&
            typeof item.n === 'number'));
}
class httpClient {
    constructor(baseURL) {
        this.responseBody = (response) => response.data;
        this.axios = axios_1.default.create({
            baseURL: baseURL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    async get(endpoint, query) {
        const response = await this.axios.get(endpoint, { params: query });
        return this.responseBody(response);
    }
    async post(endpoint, body) {
        const response = await this.axios.post(endpoint, body);
        return this.responseBody(response);
    }
    async put(endpoint, body) {
        const response = await this.axios.put(endpoint, body);
        return this.responseBody(response);
    }
    async delete(endpoint) {
        const response = await this.axios.delete(endpoint);
        return this.responseBody(response);
    }
}
exports.httpClient = httpClient;
class redisClient {
    constructor(url) {
        this.redis = (0, redis_1.createClient)({ url: url });
        this.redis.on('error', (err) => console.error(err));
        this.redis.connect();
    }
    async set(key, value) {
        console.log(value);
        await this.redis.publish(key.toString(), JSON.stringify({ pattern: key.toString(), data: { value, opt: {} } }));
    }
}
exports.redisClient = redisClient;
//# sourceMappingURL=client.js.map