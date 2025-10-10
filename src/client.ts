import { AccountEvent, ConnectorType, DepthOrder, MarketType, Order, OrderBook, OrderSide, OrderSourceType, OrderType, SubscriptionType, SymbolPrice, Trade, TradeSide } from '@barfinex/types';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { createClient } from 'redis';


export function isAccountEvent(value: any): value is AccountEvent {
    return (
        value &&
        typeof value.eventType === 'string' && // 'eventType' must be a string
        typeof value.eventTime === 'number' && // 'eventTime' must be a number (Unix timestamp)
        typeof value.options === 'object' // 'options' must be an object
    );
}

export function isOrder(value: any): value is Order {
    return (
        value &&
        (typeof value.symbol === 'object' ?
            typeof value.symbol.name === 'string' &&
            (typeof value.symbol.leverage === 'number' || value.symbol.leverage === undefined) &&
            (typeof value.symbol.quantity === 'number' || value.symbol.quantity === undefined)
            : value.symbol === undefined) && // Ensure 'symbol' is either an object with required properties or undefined
        (typeof value.id === 'string' || value.id === undefined) && // 'id' is optional and should be a string
        (typeof value.externalId === 'string' || value.externalId === undefined) && // 'externalId' is optional and should be a string
        (value.side === undefined || Object.values(OrderSide).includes(value.side)) && // 'side' is optional and must match a valid OrderSide enum value
        (value.type === undefined || Object.values(OrderType).includes(value.type)) && // 'type' is optional and must match a valid OrderType enum value
        (typeof value.price === 'number' || value.price === undefined) && // 'price' is optional and should be a number
        (typeof value.time === 'number' || value.time === undefined) && // 'time' is optional and should be a number
        (typeof value.updateTime === 'number' || value.updateTime === undefined) && // 'updateTime' is optional and should be a number
        (typeof value.quantity === 'number' || value.quantity === undefined) && // 'quantity' is optional and should be a number
        (typeof value.quantityExecuted === 'number' || value.quantityExecuted === undefined) && // 'quantityExecuted' is optional and should be a number
        typeof value.useSandbox === 'boolean' && // 'useSandbox' is required and must be a boolean
        (typeof value.priceClose === 'number' || value.priceClose === undefined) && // 'priceClose' is optional and should be a number
        Object.values(ConnectorType).includes(value.connectorType) && // 'connectorType' must be a valid ConnectorType enum value
        Object.values(MarketType).includes(value.marketType) && // 'marketType' must be a valid MarketType enum value
        typeof value.source === 'object' && // 'source' must be an object
        Object.values(OrderSourceType).includes(value.source.type) && // 'source.type' must be a valid OrderSourceType enum value
        typeof value.source.key === 'string' && // 'source.key' must be a string
        typeof value.source.restApiUrl === 'string' && // 'source.restApiUrl' must be a string
        (typeof value.leverage === 'number' || value.leverage === undefined) // 'leverage' is optional and should be a number
    );
}



export function isOrderBook(value: any): value is OrderBook {
    return (
        value &&
        Array.isArray(value.bids) && // Ensure 'bids' is an array
        value.bids.every(
            (bid: DepthOrder) =>
                typeof bid.price === 'number' && // Each 'bid' must have a numeric 'price'
                typeof bid.volume === 'number' // Each 'bid' must have a numeric 'volume'
        ) &&
        Array.isArray(value.asks) && // Ensure 'asks' is an array
        value.asks.every(
            (ask: DepthOrder) =>
                typeof ask.price === 'number' && // Each 'ask' must have a numeric 'price'
                typeof ask.volume === 'number' // Each 'ask' must have a numeric 'volume'
        ) &&
        typeof value.symbol === 'object' && // Ensure 'symbol' is an object
        typeof value.symbol.name === 'string' && // 'name' is a required string in 'symbol'
        (typeof value.symbol.leverage === 'number' || value.symbol.leverage === undefined) && // 'leverage' is optional and should be a number or undefined
        (typeof value.symbol.quantity === 'number' || value.symbol.quantity === undefined) && // 'quantity' is optional and should be a number or undefined
        typeof value.time === 'number' // Ensure 'time' is a number (Unix timestamp)
    );
}

export function isTrade(value: any): value is Trade {
    return (
        value &&
        typeof value.time === 'number' && // Check if 'time' is a number (Unix timestamp)
        typeof value.symbol === 'object' && // Ensure 'symbol' is an object
        typeof value.symbol.name === 'string' && // 'name' is a required string property
        (typeof value.symbol.leverage === 'number' || value.symbol.leverage === undefined) && // 'leverage' is optional and should be a number or undefined
        (typeof value.symbol.quantity === 'number' || value.symbol.quantity === undefined) && // 'quantity' is optional and should be a number or undefined
        typeof value.price === 'number' && // Ensure 'price' is a number
        typeof value.volume === 'number' && // Ensure 'volume' is a number
        (value.side === TradeSide.LONG || value.side === TradeSide.SHORT)
    );
}

export function isSymbolPriceArray(value: any): value is SymbolPrice {
    return (
        Array.isArray(value) &&
        value.every(
            (item) =>
                typeof item.e === 'string' &&
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
                typeof item.n === 'number'
        )
    );
}



export class httpClient {

    private axios: any;

    private responseBody = (response: AxiosResponse) => response.data;

    constructor(baseURL: string) {

        this.axios = axios.create({
            baseURL: baseURL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async get<T>(endpoint: string, query?: any): Promise<T> {
        const response = await this.axios.get(endpoint, { params: query });
        return this.responseBody(response);
    }
    public async post<T>(endpoint: string, body: any): Promise<T> {
        const response = await this.axios.post(endpoint, body);
        return this.responseBody(response);
    }
    public async put<T>(endpoint: string, body: any): Promise<T> {
        const response = await this.axios.put(endpoint, body);
        return this.responseBody(response);
    }
    public async delete<T>(endpoint: string): Promise<T> {
        const response = await this.axios.delete(endpoint);
        return this.responseBody(response);
    }

}



export class redisClient {
    private redis: any;

    constructor(url: string) {

        this.redis = createClient({ url: url });

        this.redis.on('error', (err: unknown) => console.error(err));
        this.redis.connect();
    }

    async set(key: SubscriptionType, value: any) {
        console.log(value);
        await this.redis.publish(key.toString(), JSON.stringify({ pattern: key.toString(), data: { value, opt: {} } }));
    }



}
