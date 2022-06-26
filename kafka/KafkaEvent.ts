import  { Kafka, Producer, Consumer } from "kafkajs"

export enum KafkaEventType { 
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}


interface KafKaInter {
  kafka: Kafka,
  producer(): Producer,
consumer(): Consumer

}

export class KafkaEvent implements KafKaInter {
  constructor(
    public kafka = new Kafka({
      clientId: "blog-app",
        brokers: ["kafka1:9092", "kafka2:9092"],
    })
  ) {
  }

   producer () {
    const producer = this.kafka.producer()
      producer.connect().then(() => console.log("producer connected"))
    return producer
  }

       consumer () {
        const consumer = this.kafka.consumer({ groupId: "blog-app" })
         consumer.connect().then(() => console.log("consumer connected"))
        return consumer
    }
}

export const EventBus = new KafkaEvent()
export const EventProducer = new KafkaEvent().producer()
export const EventConsumer = new KafkaEvent().consumer()

