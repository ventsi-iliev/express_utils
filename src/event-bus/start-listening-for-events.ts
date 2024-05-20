import { Stan } from "node-nats-streaming";
import { Event } from "./events/base-event";
import { Listener } from "./listener";

function startListeningForEvents<Child extends Listener<Event>>(natsClient: Stan, ...listeners: Array<new (natsClient: Stan) => Child>) {
    listeners.forEach(listener => new listener(natsClient).listen());
}

export { startListeningForEvents };