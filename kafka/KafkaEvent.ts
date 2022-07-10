import  { Kafka, Producer, Consumer } from "kafkajs"


interface KafKaInter {
  producer(): Promise<Producer>,
  consumer(): Promise<Consumer>

}

export class KafkaEvent implements KafKaInter {

  constructor(
    private kafka = new Kafka({
      clientId: "blog-app",
        brokers: ["192.168.1.240:9092"],
    })
  ) {
  }

   async producer () {
    const producers = this.kafka.producer()
      producers.connect().then(() => console.log("producer connected"))
    return producers
  }

      async consumer () {
        const consumers = this.kafka.consumer({ groupId: "blog-app" })
         consumers.connect().then(() => console.log("consumer connected"))
        return consumers
    }
}

