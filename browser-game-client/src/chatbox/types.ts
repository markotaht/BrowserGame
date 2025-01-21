export enum MessageType {
    CONNECTION = 'CONNECTION',
    CHAT = 'CHAT',
}

export interface ServerMessage {
    Type: MessageType;
    Content: string;
    Users: string[];
}

export interface ClientMessage {
    Type: MessageType;
    Sender: string;
    Content: string;
    Receiver: string;
    IsPrivate?: boolean;
}