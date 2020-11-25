import * as nats from 'node-nats-streaming';
import { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan; // Can be undefined some period of time

  get client() {
    if (!this._client) {
      throw new Error('Cannot acces NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this._client!.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });

      this._client!.on('err', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
