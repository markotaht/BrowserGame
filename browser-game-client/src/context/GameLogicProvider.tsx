import {useCallback, useEffect} from "react";
import {createContext} from 'use-context-selector';
import useGameState from "../hooks/useGameState.ts";
import {mapInfo} from "../component/constants.ts";
import {IMapTile} from "./SocketContext.tsx";
import {canWalkOnTile, TileType} from "../component/tileType.ts";
import {PlayerLocation} from "./GameStateProvider.tsx";
import {IItemNode} from "../data/IBaseNode.ts";

function mapTileComparator(a: IMapTile, b: IMapTile) {
    const dif = a.y - b.y;
    if (dif === 0) {
        return a.x - b.x;
    }
    return dif;
}

interface GameLogicContextProps {
    getTileInfo: (x: number, y: number) => IMapTile;
    getPlayerLocation: () => PlayerLocation;
    pickUpItem: (item: IItemNode) => void;
}

export const GameLogicContext = createContext<GameLogicContextProps | undefined>(undefined);

const GameLogicProvider = (props: any) => {
    const {playerState, playerStateDispatcher, mapState, mapStateDispatcher} = useGameState();

    useEffect(() => {
        const parsedMapInfo = mapInfo;
        let tiles: IMapTile[] = parsedMapInfo.Tiles;
        tiles = tiles.sort(mapTileComparator);

        mapStateDispatcher({
            type: "LOAD_MAP",
            payload: {
                tiles: tiles,
                width: parsedMapInfo.MapWidth,
                height: parsedMapInfo.MapHeight,
                region: parsedMapInfo.Region
            }
        })
    }, [mapStateDispatcher]);


    const getTileInfo = useCallback((x: number, y: number): IMapTile => {
        return mapState.tiles[x + y * mapState.width];
    }, [mapState]);

    const movePlayer = useCallback((location: PlayerLocation) => {
        const {location: playerLocation} = playerState;
        const newLocation = {x: playerLocation.x + location.x, y: playerLocation.y + location.y};
        const tileInfo = getTileInfo(newLocation.x, newLocation.y);
        if (canWalkOnTile(tileInfo.type as TileType)) {
            playerStateDispatcher({
                type: "SET_LOCATION", payload: newLocation
            });
        }
    }, [getTileInfo, playerState, playerStateDispatcher]);

    const handleKeyUp = (event: KeyboardEvent) => {
        let dirX = 0;
        let dirY = 0;
        if (event.key === 'ArrowLeft') {
            dirX = -1;
        } else if (event.key === 'ArrowRight') {
            dirX = 1;
        } else if (event.key === 'ArrowUp') {
            dirY = -1;
        } else if (event.key === 'ArrowDown') {
            dirY = 1;
        }

        movePlayer({x: dirX, y: dirY});
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyUp]);

    const getPlayerLocation = useCallback(() => {
        return playerState.location;
    },[playerState])

    const pickUpItem = useCallback((item: IItemNode) => {
        playerStateDispatcher({type: "PICKUP_ITEM", payload: item});
    }, [playerStateDispatcher])

    const values = {
        getTileInfo,
        getPlayerLocation,
        pickUpItem,
    }

    return <GameLogicContext.Provider value={values}>{props.children}</GameLogicContext.Provider>;
}

export default GameLogicProvider;