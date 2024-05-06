import nats, { Message, Stan, SubscriptionOptions } from 'node-nats-streaming';

const aha: keyof SubscriptionOptions = 'durableName';

enum Subjects {
    TicketCreated = 'ticker:created'
}

interface TicketCreatedData {
    subjectName: Subjects;
    title: string;
    price: number;
}

abstract class Listener<T extends { subjectName: string }> {
    abstract subject: T['subjectName'];
    // abstract subject: string;
    abstract queueGroupName: string;

    // abstract onMessage(data: any, msg: Message): void;
    abstract onMessage(data: {
        [Property in keyof T as Exclude<Property, 'subjectName'>]: T[Property]
    }, msg: Message): void;

    protected ackWait = 5 * 1000;
    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

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
            console.log('msg');

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

class TestListener extends Listener<TicketCreatedData> {
    subject = Subjects.TicketCreated;
    queueGroupName = 'test-queue-group-name';

    onMessage(data: {
        [Property in keyof TicketCreatedData as Exclude<Property, 'subjectName'>]: TicketCreatedData[Property]
    }, msg: Message): void {
        console.log('test', data);

        msg.ack();
    }
}

const stan = nats.connect('cluster-id', 'client-id', {
    url: 'http://localhost:4222'
})

stan.on('connect', () => {
    console.log('Listener connected to NATS!');

    stan.on('close', () => {
        console.log('NATS Connection closed!');

        process.exit();
    })
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());