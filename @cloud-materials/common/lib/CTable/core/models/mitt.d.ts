export type EventType = string | symbol;
export type Handler<T extends any[] = any[]> = (...args: T) => void;
export type WildcardHandler = (type: EventType, ...args: any[]) => void;
export type EventHandlerList = Array<Handler>;
export type WildCardEventHandlerList = Array<WildcardHandler>;
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>;
export interface Emitter {
    all: EventHandlerMap;
    on: (<T extends any[] = any[]>(type: EventType, handler: Handler<T>) => void) & ((type: '*', handler: WildcardHandler) => void);
    off: (<T extends any[] = any[]>(type: EventType, handler: Handler<T>) => void) & ((type: '*', handler: WildcardHandler) => void);
    emit: (<T extends any[] = any[]>(type: EventType, ...args: T) => void) & ((type: '*', ...args: any[]) => void);
}
/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * modify from mitt https://www.npmjs.com/package/mitt
 * support multiple event arguments callback
 *
 * @name mitt
 * @returns {Mitt}
 */
export declare function mitt(_all?: EventHandlerMap): Emitter;
