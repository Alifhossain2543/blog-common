export declare enum KafkaEventType {
    POST_CREATED = "POST:CREATED",
    POST_UPDATED = "POST:UPDATED",
    POST_DELETED = "POST:DELETED"
}
export interface CreateEvent {
    type: KafkaEventType.POST_CREATED;
    data: {
        id: string;
        title: string;
        content: string;
        authorId: number;
    };
}
export interface UpdateEvent {
    type: KafkaEventType.POST_UPDATED;
    data: {
        id: string;
        title: string;
        content: string;
    };
}
export interface DeleteEvent {
    type: KafkaEventType.POST_DELETED;
    data: {
        id: string;
    };
}
export declare type SupportedEvent = CreateEvent | UpdateEvent | DeleteEvent;
