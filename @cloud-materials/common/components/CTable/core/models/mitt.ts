/*
 * @Author: youjingyu
 * @Date: 2021-10-06 16:21:11
 * @LastEditTime: 2021-10-06 16:48:09
 * @LastEditors: youjingyu
 * @Description:
 */
// fork from https://github.com/developit/mitt

export type EventType = string | symbol;

// An event handler can take an optional event argument
// and should not return a value
// eslint-disable-next-line no-unused-vars
export type Handler<T extends any[] = any[]> = (...args: T) => void;
export type WildcardHandler = (type: EventType, ...args: any[]) => void;

// An array of all currently registered event handlers for a type
export type EventHandlerList = Array<Handler>;
export type WildCardEventHandlerList = Array<WildcardHandler>;

// A map of event types and their corresponding event handlers.
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>;

export interface Emitter {
  all: EventHandlerMap;

  on: (<T extends any[] = any[]>(type: EventType, handler: Handler<T>) => void) &
    ((type: '*', handler: WildcardHandler) => void);

  off: (<T extends any[] = any[]>(type: EventType, handler: Handler<T>) => void) &
    ((type: '*', handler: WildcardHandler) => void);

  // eslint-disable-next-line no-unused-vars
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
export function mitt(_all?: EventHandlerMap): Emitter {
  const all: EventHandlerMap = _all || new Map();

  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,

    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on<T extends any[] = any[]>(type: EventType, handler: Handler<T>) {
      const handlers = all.get(type);
      const added = handlers && handlers.push(handler as Handler<any[]>);
      if (!added) {
        all.set(type, [handler as Handler<any[]>]);
      }
    },

    /**
     * Remove an event handler for the given type.
     * @param {string|symbol} type Type of event to unregister `handler` from, or `"*"`
     * @param {Function} handler Handler function to remove
     * @memberOf mitt
     */
    off<T extends any[] = any[]>(type: EventType, handler: Handler<T>) {
      const handlers = all.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler as Handler<any[]>) >>> 0, 1);
      }
    },

    /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing "*" handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit<T extends any[] = any[]>(type: EventType, ...args: T) {
      ((all.get(type) || []) as EventHandlerList).slice().map(handler => {
        handler(...args);
      });
      ((all.get('*') || []) as WildCardEventHandlerList).slice().map(handler => {
        handler(type, ...args);
      });
    },
  };
}
