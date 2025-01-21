import {createContext, PropsWithChildren, useCallback, useEffect, useRef, useState} from "react";

export interface GameRequest {
    Controller: string;
    Method: string;
    Arguments?: object[];
}

export interface ServerEvent<T> {
    EventType: string | 'Error';
    Data: T | GameError;
}

export interface GameError {
    Code: never;
    Message: string;
    Data: object;
}

export interface GameResult {
    EventType: string;
    Data: object;
}

export interface GameResponse {
    Result: GameResult;
    Error: GameError;
}

export interface IMapTile {
    x: number;
    y: number;
    region: number;
    color: { R: number, G: number, B: number };
    contents: string[];
}

export interface GameContextProps {
    send: (request: GameRequest) => void;
    addListener: (event: string, callback: EventCallback) => void;
    removeListener: (event: string, callback: EventCallback) => void;
}

const defaultProps: GameContextProps = {
    send: () => {
    },
    addListener: () => {
    },
    removeListener: () => {
    }
}

export const GameContext = createContext<GameContextProps>(defaultProps);

//export type EventCallback = (e: GameResponse) => void;
export type EventCallback = (e: any) => void;

const GameContextProvider = (props: PropsWithChildren) => {
    const [socket, setSocket] = useState<WebSocket>();
    const eventListeners = useRef(new Map<string, EventCallback[]>());

    const send = useCallback((request: GameRequest) => {
        if (socket !== undefined && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(request));
        }
    }, [socket]);

    const addListener = useCallback((event: string, callback: EventCallback) => {
        if (eventListeners.current.has(event)) {
            eventListeners.current.get(event)!.push(callback);
        } else {
            eventListeners.current.set(event, [callback]);
        }
    }, []);

    const removeListener = useCallback((event: string, callback: EventCallback) => {
        if (eventListeners.current.has(event)) {
            const callbacks = eventListeners.current.get(event)!.filter(elem => elem !== callback);
            eventListeners.current.set(event, callbacks);
        }
    }, []);

    useEffect(() => {
        const webSocket = new WebSocket("ws://localhost:5044/api/game/ws?username=marko");
        webSocket.addEventListener("open", (event) => {
            console.log("Connected to GameServer", event);
            webSocket.send(JSON.stringify({Controller: "Map", Method: "get_map"}));
        });

        webSocket.addEventListener("message", event => {
            const response = JSON.parse(event.data) as ServerEvent<any>;
            if (response.EventType === 'Error') {
                //HandleError
            }

            const callbacks = eventListeners.current.get(response.EventType) || [];
            for (const callback of callbacks) {
                callback(response.Data);

            }
            //eventListeners.current.get(message.Result.EventType)(message.Result.Data);
            /*   const message = JSON.parse(event.data) as ServerMessage;
               setMessages(messages => [message, ...messages]);*/
        });

        webSocket.addEventListener("close", (event) => {
            console.log("Closed", event);
        });

        setSocket(webSocket);

        return () => {
            webSocket.close(1000, "User left");
        }
    }, []);

    const value = {
        send,
        addListener,
        removeListener
    }

    return <GameContext.Provider value={value}>{props.children}</GameContext.Provider>;
}

export default GameContextProvider;