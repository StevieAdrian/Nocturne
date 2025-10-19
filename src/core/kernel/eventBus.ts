type Callback<T = any> = (payload: T) => void;
type EventMap = Record<string, Callback[]>;
class EventBus {
    private listeners: EventMap = {};

    subscribe<T = any>(event: string, callback: Callback<T>) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);

        return () => {
            this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
        };
    }

    publish<T = any>(event: string, data: T) {
        this.listeners[event]?.forEach((cb) => cb(data));
    }

    unsubscribe<T = any>(event: string, callback: Callback<T>) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }

    clearAll() {
        this.listeners = {};
    }
}

export const eventBus = new EventBus();
