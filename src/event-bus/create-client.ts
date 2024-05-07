import nats, { Stan, StanOptions } from "node-nats-streaming";

type Constructor = new (...args: any[]) => any;

function createClient<Listener extends Constructor, Publisher extends Constructor>(
    clusterId: string,
    clientId: string,
    options: StanOptions,
    listeners?: Listener[],
    publishers?: Publisher[]
) {
    const stan = nats.connect(clusterId, clientId, options);

    stan.on('connect', async () => {
        console.log('Listener connected to NATS!');

        stan.on('close', () => {
            console.log('NATS Connection closed!');

            process.exit();
        });

        if(listeners) {
            for(let listener of listeners) {
                new listener(stan).listen();
            }
        }

        if(publishers) {
            for(let publisher of publishers) {
                // TODO add publisher
            }
        }
    });

    process.on('SIGINT', () => stan.close());
    process.on('SIGTERM', () => stan.close());
}

class NatsManager {
    private _client?: Stan;

    get client() {
        if(!this._client) {
            throw new Error('Cannot access NATS client before connecting!');
        }

        return this._client;
    }

    connect(clusterId: string, clientId: string, options: StanOptions) {
        this._client = nats.connect(clusterId, clientId, options);

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to NATS!');
                resolve();
            });

            this.client.on('error', err => {
                console.log(err);
                reject(err);
            });

        })
    }
}

// createClient('cluster', 'client', {url: 'dada'}, [
//     PostCreatedListener
// ])

export { createClient };