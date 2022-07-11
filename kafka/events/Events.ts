// import { KafkaEvent } from "../KafkaEvent"
// import { SupportedEvent, KafkaEventType } from './type';
// import {  Consumer, Producer } from "kafkajs"



// export class KafkaBus {
//   KafkaClass = new KafkaEvent()

//   constructor() {}

//   //connect producer
//   public async connectProducer() {
//     const producer = await this.KafkaClass.producer()
//     await producer.connect().then(() => console.log("Producer connected"))
//     return producer
//   }
//   //connect consumer
//   public async connectConsumer() {
//     const consumer = await this.KafkaClass.consumer()
//     await consumer.connect().then(() => console.log("Consumer connected"))
//     return consumer
//   }

//   async send(
//     topic: KafkaEventType,
//     event: SupportedEvent,
//   ) {
//     const producer = await this.connectProducer()
//     await producer.send({
//       topic,
//       messages: [{ value: JSON.stringify(event.data) as unknown as Buffer }],
//     })
//   }

//   async recieve(topic: KafkaEventType) {
//     const consumer = await this.connectConsumer()
//     await consumer.subscribe({ topic, fromBeginning: true })
//     return consumer
//   }
// }

// export const Kafka = new KafkaBus()

// const connectProducer = new KafkaBus().connectProducer()
// Kafka.send(
//   KafkaEventType.POST_CREATED,
//   {
//     type: KafkaEventType.POST_CREATED,
//     data: { id: 1, title: "test", content: "test", authorId: 1 },
//   }
// )

// const connectConsumer = new KafkaBus().connectConsumer()
// Kafka.recieve( KafkaEventType.POST_CREATED)


// KafkaBus.recieve(KafkaEventType.POST_CREATE).then(consumer => {
//   consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log(`Received message ${message}`)
//     }
//   })
// }
// )

// KafkaBus.send({type: KafkaEventType.POST_CREATED, data: {id: "1", title: "title", content: "content", authorId: 1}}, KafkaEventType.POST_CREATED)