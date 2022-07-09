import { Kafka, Producer, Consumer } from "kafkajs";
interface KafKaInter {
    kafka: Kafka;
    producer(): Promise<Producer>;
    consumer(): Promise<Consumer>;
}
export declare class KafkaEvent implements KafKaInter {
    kafka: Kafka;
    constructor(kafka?: Kafka);
    producer(): Promise<Producer>;
    consumer(): Promise<Consumer>;
}
export {};
