"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaEvent = void 0;
const kafkajs_1 = require("kafkajs");
class KafkaEvent {
    constructor(kafka = new kafkajs_1.Kafka({
        clientId: "blog-app",
        brokers: ["192.168.1.240:9092"],
    })) {
        this.kafka = kafka;
    }
    producer() {
        return __awaiter(this, void 0, void 0, function* () {
            const producers = this.kafka.producer({ createPartitioner: kafkajs_1.Partitioners.DefaultPartitioner });
            return producers;
        });
    }
    consumer() {
        return __awaiter(this, void 0, void 0, function* () {
            const consumers = this.kafka.consumer({ groupId: "blog-app" });
            return consumers;
        });
    }
}
exports.KafkaEvent = KafkaEvent;
