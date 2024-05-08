import nats, { Stan, StanOptions } from "node-nats-streaming";

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

export { NatsManager };