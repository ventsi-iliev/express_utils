import { Message, Stan, SubscriptionOptions } from 'node-nats-streaming';
import { Event } from './events/base-event';
export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;

    protected ackWait = 5 * 1000;
    protected client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    /**
     * Add dynamic function names to be called with the subscriptionOptions()
     * @param opts 
     * @returns 
     */
    subscriptionOptions(opts?: [{
        fnName: keyof SubscriptionOptions,
        arguments: Array<string>
    }]) {
        const options = this.client.subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);

        if(opts && options) {
            for(let opt of opts) {
                (options as any)[opt.fnName](opt.arguments);
            }
        }

        return options;
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg: Message) => {
            const parsedData = this.parseMessage(msg);

            this.onMessage(parsedData, msg);
        })
    }

    parseMessage(msg: Message) {
        const data = msg.getData();

        if(typeof data === 'string') {
            return JSON.parse(data);
        }

        // Parse Buffer and get JSON out of it
        return JSON.parse(data.toString('utf8'));
    }
}