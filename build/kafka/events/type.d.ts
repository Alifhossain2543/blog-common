export declare enum KafkaEventType {
    POST_CREATED = "POST_CREATED",
    POST_UPDATED = "POST_UPDATED",
    POST_DELETED = "POST_DELETED"
}
export interface CreateEvent {
    type: KafkaEventType.POST_CREATED;
    data: {
        id: number;
        title: string;
        content: string;
        authorId: number;
    };
}
export interface UpdateEvent {
    type: KafkaEventType.POST_UPDATED;
    data: {
        id: number;
        title: string;
        content: string;
        authorId: number;
    };
}
export interface DeleteEvent {
    type: KafkaEventType.POST_DELETED;
    data: {
        id: number;
        authorId: number;
    };
}
export declare type SupportedEvent = CreateEvent | UpdateEvent | DeleteEvent;
