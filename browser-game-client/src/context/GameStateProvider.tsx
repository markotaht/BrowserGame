import {createContext, useReducer,} from "react";
import {IMapTile} from "./SocketContext.tsx";

interface PlayerLocation {
    x: number;
    y: number;
}

interface PlayerState {
    location: PlayerLocation;
    inventory: any[];
}

interface PlayerAction {
    type: string;
    payload: any;
}

const initialPlayerState: PlayerState = {
    location: {x: 0, y: 0},
    inventory: [],
}

interface MapState {
    tiles: IMapTile[];
    width: number;
    height: number;
    region: number;
}

const initialMapState = {
    tiles: [],
    width: 0,
    height: 0,
    region: 0,
}

const playerStateReducer = ((state: PlayerState, action: PlayerAction) => {
    switch (action.type) {
        case "SET_LOCATION": {
            return {...state, location: action.payload};
        }
        case "PICKUP_ITEM":{
            return {...state, inventory: [...state.inventory, action.payload]};
        }
        default:
            return state;
    }
});

const mapStateReducer = ((state: MapState, action: PlayerAction): MapState => {
    switch (action.type) {
        case "LOAD_MAP":
            return action.payload;
        default:
            return state;
    }
})

interface GameContextProps {
    playerState: PlayerState;
    playerStateDispatcher: () => void;
    mapState: MapState;
    mapStateDispatcher: () => void;
}

const initialContextState = {
    playerState: initialPlayerState,
    mapState: initialMapState,
}

export const GameStateContext = createContext<GameContextProps>(initialContextState);

const GameStateProvider = (props: any) => {
    const [playerState, playerStateDispatch] = useReducer(playerStateReducer, initialPlayerState);
    const [mapState, mapStateDispatch] = useReducer(mapStateReducer, initialMapState);

    const values = {
        playerState: playerState,
        playerStateDispatcher: playerStateDispatch,
        mapState: mapState,
        mapStateDispatcher: mapStateDispatch
    };

    return (
        <GameStateContext.Provider value={values}>{props.children}</GameStateContext.Provider>
    );
}

export default GameStateProvider;