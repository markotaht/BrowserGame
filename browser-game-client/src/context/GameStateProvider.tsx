import {useReducer} from "react";
import {createContext} from 'use-context-selector';
import {IMapTile} from "./SocketContext.tsx";
import {IInventorySocket} from "../data/IInventorySocket.ts";
import {IItemNode} from "../data/IBaseNode.ts";

export interface PlayerLocation {
    x: number;
    y: number;
}

interface PlayerState {
    location: PlayerLocation;
    inventory: IInventorySocket[];
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
        case "PICKUP_ITEM": {
            const item = action.payload as IItemNode;
            if (item.stackable) {
                const index = state.inventory.findIndex((value: IInventorySocket) => value.itemNode.id === item.id);
                if (index > -1) {
                    const elem = state.inventory[index];
                    state.inventory[index] = {...elem, count: elem.count + 1};
                    return {...state, inventory: [...state.inventory]};
                }
            }
            return {...state, inventory: [...state.inventory, {itemNode: action.payload, count: 1}]};
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

interface GameStateContextProps {
    playerState: PlayerState;
    playerStateDispatcher: React.Dispatch<PlayerAction>;
    mapState: MapState;
    mapStateDispatcher: React.Dispatch<PlayerAction>;
}

export const GameStateContext = createContext<GameStateContextProps | undefined>(undefined);

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