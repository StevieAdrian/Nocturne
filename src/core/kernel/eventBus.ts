type EventHandler = (payload?: any) => void;

class EventBus {
    private topics: Map<string, EventHandler[]> = new Map();

    subscribe(topic: string, handler: EventHandler) {
        if (!this.topics.has(topic)) this.topics.set(topic, []);
        this.topics.get(topic)!.push(handler);
    }

    publish(topic: string, payload?: any) {
        const handlers = this.topics.get(topic);
        if (!handlers) return;
        handlers.forEach((h) => h(payload));
    }

    unsubscribe(topic: string, handler: EventHandler) {
        const handlers = this.topics.get(topic);
        if (!handlers) return;
        this.topics.set(topic, handlers.filter((h) => h !== handler));
    }
}

export const eventBus = new EventBus();
