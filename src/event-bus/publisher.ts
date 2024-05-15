
import { Stan } from 'node-nats-streaming';
import { Event } from './events/base-event';
export abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    // Add promise
    publish(data: T['data']): Promise<void | string> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                console.log(data);
                
                if(err) {
                    return reject(err);
                }

                console.log(`Event published. Subject: ${this.subject}!`);
                resolve(`Event published: ${this.subject}!`);
            });
        })
    }
}