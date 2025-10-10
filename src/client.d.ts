import { AccountEvent, Order, OrderBook, SubscriptionType, SymbolPrice, Trade } from '@barfinex/types';
export declare function isAccountEvent(value: any): value is AccountEvent;
export declare function isOrder(value: any): value is Order;
export declare function isOrderBook(value: any): value is OrderBook;
export declare function isTrade(value: any): value is Trade;
export declare function isSymbolPriceArray(value: any): value is SymbolPrice;
export declare class httpClient {
    private axios;
    private responseBody;
    constructor(baseURL: string);
    get<T>(endpoint: string, query?: any): Promise<T>;
    post<T>(endpoint: string, body: any): Promise<T>;
    put<T>(endpoint: string, body: any): Promise<T>;
    delete<T>(endpoint: string): Promise<T>;
}
export declare class redisClient {
    private redis;
    constructor(url: string);
    set(key: SubscriptionType, value: any): Promise<void>;
}
