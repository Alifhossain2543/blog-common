import { KafkaEvent } from "../KafkaEvent";
import { SupportedEvent, KafkaEventType } from './type';
import { Consumer } from "kafkajs";
interface Events {
    send: (topic: KafkaEventType, event: SupportedEvent) => Promise<void>;
    recieve: (topic: KafkaEventType) => Promise<Consumer>;
}
export declare class Kafka extends KafkaEvent implements Events {
    constructor();
    producerConnect(): Promise<import("kafkajs").Producer>;
    send(topic: KafkaEventType, event: SupportedEvent): Promise<void>;
    consumerConnect(): Promise<Consumer>;
    recieve(topic: KafkaEventType): Promise<Consumer>;
}
export declare const KafkaBus: Kafka;
export {};
