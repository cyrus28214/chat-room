export interface Response<T> {
    message: string;
    code: number;
    data: T;
}

export interface Message {
    messageId: number;
    roomId: number;
    sender: string;
    content: string;
    time: number;
}

export interface RoomPreviewInfo {
    roomId: number;
    roomName: string;
    lastMessage: Message | null;
}