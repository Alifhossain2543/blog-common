import { KafkaEvent } from "../KafkaEvent";
import { SupportedEvent, KafkaEventType } from './type';
import { Consumer } from "kafkajs";
interface Events {
    send: (topic: KafkaEventType, event: SupportedEvent) => Promise<void>;
    recieve: (topic: KafkaEventType) => Promise<Consumer>;
}
export declare class Kafka implements Events {
    protected KafkaClass: KafkaEvent;
    private producer;
    private consumer;
    constructor();
    send(topic: KafkaEventType, event: SupportedEvent): Promise<void>;
    recieve(topic: KafkaEventType): Promise<Consumer>;
}
export declare const KafkaBus: Kafka;
export {};
