import {createContext, useEffect, useState} from "react";
import {canWalkOnTile} from "../component/tileType.ts";
import {IMapTileContent} from "./SocketContext.tsx";

interface PlayerLocation {
    x: number;
    y: number;
}

interface PlayerState {
    location: PlayerLocation;
    inventory: IMapTileContent[];
    addToInventory: (item: IMapTileContent) => void;
}

const defaultPlayerState: PlayerState = {
    inventory: [],
    location: {x: 0, y: 0},
    addToInventory: (item: IMapTileContent) => {},
}

export const PlayerContext = createContext<PlayerState>(defaultPlayerState);

export const PlayerContextProvider = (props: any) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [inventory, setInventory] = useState<IMapTileContent[]>([]);
    const {getTileInfo} = useGameLogic();

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            console.log(event);
            let newX = x;
            let newY = y;
            if(event.key === 'ArrowLeft'){
                newX = newX - 1;
            } else if(event.key === 'ArrowRight'){
                newX = newX + 1;
            } else if(event.key === 'ArrowUp'){
                newY = newY - 1;
            } else if(event.key === 'ArrowDown'){
                newY = newY + 1;
            }

            const tile = getTileInfo(newX,newY);
            console.log("position", newX, newY);
            console.log("tile", tile);
            if(canWalkOnTile(tile.type)){
                setX(newX);
                setY(newY);
            }
        }

        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [getTileInfo,x,y]);

    const addToInventory = (item: IMapTileContent) => {
        setInventory([...inventory, item]);
    }

    const value = {
        location: {x: x, y: y},
        inventory: inventory,
        addToInventory: addToInventory
    }
    return <PlayerContext.Provider value={value}>{props.children}</PlayerContext.Provider>
}