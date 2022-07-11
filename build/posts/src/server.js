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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.producer = void 0;
const client_1 = __importDefault(require("./client"));
const app_1 = require("./app");
const kafkajs_1 = require("kafkajs");
// import {KafkaBus, KafkaEventType} from '@hrioymahmud/blogcommon'
const kafka = new kafkajs_1.Kafka({
    clientId: "blog-app",
    brokers: ["192.168.1.240:9092"],
});
exports.producer = kafka.producer();
function connectProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.producer.connect().then(() => console.log("producer connected."));
    });
}
connectProducer();
// KafkaBus.send(
//     KafkaEventType.POST_CREATED
// ,
//   {
//     type: KafkaEventType.POST_CREATED,
//     data: { id: "1", title: "title", content: "content", authorId: 1 },
//   }
// )
// KafkaBus.recieve(KafkaEventType.POST_CREATED).then(consumer => {
//   consumer.run({
//     eachMessage: async ({ topic, message }) => {
//      const val = message.value
//      console.log(topic)
//       console.log(val && val.toString())
//     }
//   })
// }
// )
function startDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client_1.default
            .$connect()
            .then(() => {
            console.log("Database connected");
        })
            .catch((err) => {
            console.log(err);
        });
    });
}
const server = app_1.app.listen(3000, () => {
    console.log("listenign on port 3000");
}); // creating a server and storing it's value in a variable.
startDb();
// this is to make sure the server does not go down before completing the pending request when there is an error.
process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection Error... System will terminate soon");
    console.log(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});
