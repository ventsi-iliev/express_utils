import { Stan } from 'node-nats-streaming';

enum Subjects {
    TicketCreated = 'ticker:created'
}

interface Event {
    subject: Subjects;
    data: any;
}

abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];

    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    // Add promise
    publish(data: T['data']) {
        this.client.publish(this.subject, JSON.stringify(data), () => {
            console.log('Event published!');
        });
    }
}