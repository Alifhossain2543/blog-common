import  { Kafka, Producer, Consumer } from "kafkajs"


interface KafKaInter {
  kafka: Kafka,
  producer(): Promise<Producer>,
  consumer(): Promise<Consumer>

}

export class KafkaEvent implements KafKaInter {
  constructor(
    public kafka = new Kafka({
      clientId: "blog-app",
        brokers: ["192.168.1.240:9092"],
    })
  ) {
  }

   async producer () {
    const producer = this.kafka.producer()
      producer.connect().then(() => console.log("producer connected"))
    return producer
  }

      async consumer () {
        const consumer = this.kafka.consumer({ groupId: "blog-app" })
         consumer.connect().then(() => console.log("consumer connected"))
        return consumer
    }
}

