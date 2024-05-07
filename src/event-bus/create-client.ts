import nats, { StanOptions } from "node-nats-streaming";
import { PostCreatedListener } from "./events/post-created-listener";

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

// createClient('cluster', 'client', {url: 'dada'}, [
//     PostCreatedListener
// ])

export { createClient };