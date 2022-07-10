import { KafkaEvent } from "../KafkaEvent";
import { SupportedEvent, KafkaEventType } from './type';
import { Consumer, Producer } from "kafkajs";
export declare class KafkaBus {
    KafkaClass: KafkaEvent;
    constructor();
    connectProducer(): Promise<Producer>;
    connectConsumer(): Promise<Consumer>;
    send(topic: KafkaEventType, event: SupportedEvent): Promise<void>;
    recieve(topic: KafkaEventType): Promise<Consumer>;
}
