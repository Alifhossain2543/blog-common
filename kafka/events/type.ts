export enum KafkaEventType {
  POST_CREATED = "POST_CREATED",
  POST_UPDATED = "POST_UPDATED",
  POST_DELETED = "POST_DELETED",
}


export interface CreateEvent {
  type: KafkaEventType.POST_CREATED
  data: {
    id: string
    title: string
    content: string
    authorId: number
  }
}

export interface UpdateEvent {
  type: KafkaEventType.POST_UPDATED
  data: {
    id: string
    title: string
    content: string
  }
}

export interface DeleteEvent {
  type: KafkaEventType.POST_DELETED
  data: {
    id: string
  }
}

export type SupportedEvent = CreateEvent | UpdateEvent | DeleteEvent
