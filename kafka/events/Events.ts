import { KafkaEventType, EventProducer } from '../KafkaEvent';

//create a class for all the event type <<ONLY the PRODUCERS

export interface CreateEvent {
  type: KafkaEventType.CREATE
  data: {
    id: string
    title: string
    content: string
    authorId: number
  }
}

export interface UpdateEvent {
  type: KafkaEventType.UPDATE
  data: {
    id: string
    title: string
    content: string
  }
}

export interface DeleteEvent {
  type: KafkaEventType.DELETE
  data: {
    id: string
  }
}

//write a supported event type
export type SupportedEvent = CreateEvent | UpdateEvent | DeleteEvent

//write a class based on event generic type

export class Events {
  constructor(public Producer = EventProducer) {}

  async createEvent(topic: string, payload: SupportedEvent) {
    const event = {
      type: payload.type,
      data: payload.data,
    }
    await this.Producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(event) }],
    })
  }
}

const newEvent = new Events()

// {type : KafkaEventType.CREATE, data : {id : "1", title : "title", content : "content", 
    // authorId : 1}}