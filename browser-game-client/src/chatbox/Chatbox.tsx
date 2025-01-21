import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import './Chatbox.css';
import {ClientMessage, MessageType, ServerMessage} from "./types.ts";

function createClientMessage(message: string): ClientMessage {
    return {
        Type: MessageType.CHAT,
        Sender: "marko",
        Content: message,
        Receiver: "everyone",
        IsPrivate: false
    }
}

const Chatbox = () => {
    const [messages, setMessages] = useState<ServerMessage[]>([]);
    const [socket, setSocket] = useState<WebSocket>();
    const [inputValue, setInputValue] = useState('');


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

    };

    useEffect(() => {
        const webSocket = new WebSocket("ws://localhost:5044/api/chat/ws?username=marko");
        webSocket.addEventListener("open", (event) => {
            console.log("Connected to ChatServer", event);
        });

        webSocket.addEventListener("message", event => {
            const message = JSON.parse(event.data) as ServerMessage;
            setMessages(messages => [message, ...messages]);
        });

        webSocket.addEventListener("close", (event) => {
            console.log("Closed", event);
        });

        setSocket(webSocket);

        return () => {
            webSocket.close(1000, "User left");
        }
    }, []);

    const sendMessage = (event: FormEvent) => {
        event.preventDefault();
        if (socket !== undefined) {
            const message = createClientMessage(inputValue);
            socket.send(JSON.stringify(message));
            setInputValue('');
        }
    };

    return (
        <div className={'container'}>
            <div className={'messages'}>
                {messages.map((message) => <div className={'message'}>{message.Content}</div>)}
            </div>
            <form onSubmit={sendMessage}>
                <div className={'input'}>
                    <input type="text" value={inputValue} onChange={handleInputChange}/>
                    <input type={'submit'} className={'send-button'} value={'Send'}/>
                </div>
            </form>
        </div>
    )
        ;
}

export default Chatbox;