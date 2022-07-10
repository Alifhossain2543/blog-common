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
exports.KafkaBus = exports.Kafka = void 0;
const KafkaEvent_1 = require("../KafkaEvent");
class Kafka extends KafkaEvent_1.KafkaEvent {
    constructor() {
        super();
    }
    //producer connect
    producerConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const producer = yield this.producer();
            yield producer.connect().then(() => console.log("Producer connected"));
            return producer;
        });
    }
    //send function
    send(topic, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const producer = yield this.producerConnect();
            yield producer.connect().then(() => {
                console.log("Producer connected");
            });
            yield producer.send({
                topic,
                messages: [{ value: JSON.stringify(event.data) }],
            });
        });
    }
    //consumer connect
    consumerConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const consumer = yield this.consumer();
            yield consumer.connect().then(() => console.log("Consumer connected"));
            return consumer;
        });
    }
    //recieve function
    recieve(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            const consumer = yield this.consumerConnect();
            yield consumer.subscribe({ topic, fromBeginning: true });
            return consumer;
        });
    }
}
exports.Kafka = Kafka;
exports.KafkaBus = new Kafka();
// KafkaBus.recieve(KafkaEventType.POST_CREATE).then(consumer => {
//   consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log(`Received message ${message}`)
//     }
//   })
// }
// )
// KafkaBus.send({type: KafkaEventType.POST_CREATED, data: {id: "1", title: "title", content: "content", authorId: 1}}, KafkaEventType.POST_CREATED)
