import {createContext, PropsWithChildren, useCallback, useEffect, useState} from "react";
import useGame from "../hooks/useGame.ts";
import {IMapTile} from "./GameContext.tsx";

interface MapData {
    mapTiles: IMapTile[];
    width: number;
    height: number;
}

interface MapInfo {
    MapWidth: number;
    MapHeight: number;
    Region: number;
    Tiles: IMapTile[];
}
export const MapContext = createContext<MapData>({mapTiles: [], width: 0, height: 0});

const MapContextProvider = (props: PropsWithChildren) => {
    const {send, addListener, removeListener} = useGame();
    const [mapTiles, setMapTiles] = useState<IMapTile[]>([]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [region, setRegion] = useState(0);

    const handleMapLoad = useCallback((e: MapInfo) => {
        console.log("MapLoad", e);
        setMapTiles(e.Tiles);
        setWidth(e.MapWidth);
        setHeight(e.MapHeight);
        setRegion(e.Region);
    }, []);

    const handleTileUpdate = useCallback((e: IMapTile) => {
        console.log("TileUpdate", e);
        if(e.region === region) {
            setMapTiles(tiles  => {
                const temp = tiles;
                temp[e.x + e.y * width] = e;
                return [...temp];
            });
        }
    }, [region, width]);

    useEffect(() => {
        addListener("MapLoad", handleMapLoad);
        addListener("TileUpdate", handleTileUpdate);



        /* addListener("MapUpdate", (e:GameResponse) => {
             const tiles = e.Result.Data as IMapTile[];
             setMapTiles(tiles.map(tile => <MapTile mapTile={tile}/>));
         })*/
        send({Controller: "Map", Method: "get_map"});
        return () => {
            removeListener("MapLoad", handleMapLoad);
            removeListener("TileUpdate", handleTileUpdate);
        }
    }, [addListener, handleMapLoad, handleTileUpdate, send]);


    return (
        <MapContext.Provider value={{mapTiles, width, height}}>{props.children}</MapContext.Provider>
    );
}

export default MapContextProvider;