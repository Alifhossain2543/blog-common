import { Kafka, Producer, Consumer } from "kafkajs";
interface KafKaInter {
    producer(): Promise<Producer>;
    consumer(): Promise<Consumer>;
}
export declare class KafkaEvent implements KafKaInter {
    private kafka;
    constructor(kafka?: Kafka);
    producer(): Promise<Producer>;
    consumer(): Promise<Consumer>;
}
export {};
