import  { Kafka, Producer, Consumer, Partitioners } from "kafkajs"
import { createPost } from '../../posts/src/controllers/posts-controller';


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
    const producers = this.kafka.producer({createPartitioner: Partitioners.DefaultPartitioner})
    return producers
  }

      async consumer () {
        const consumers = this.kafka.consumer({ groupId: "blog-app" })
        return consumers
    }
}

