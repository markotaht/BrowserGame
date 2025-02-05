import {createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import {IMapTile} from "./SocketContext.tsx";
import {mapInfo} from "../component/constants.ts";

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

interface MapContextProps {
    mapTiles: IMapTile[];
    width: number;
    height: number;
    getTileInfo: (x: number, y: number) => IMapTile;
}

function mapTileComparator(a: IMapTile, b: IMapTile) {
    const dif = a.y - b.y;
    if (dif === 0) {
        return a.x - b.x;
    }
    return dif;
}

export const MapContext = createContext<MapContextProps | undefined>(undefined);

const MapContextProvider = (props: PropsWithChildren) => {
    //   const {send, addListener, removeListener} = useGame();
    const [mapTiles, setMapTiles] = useState<IMapTile[]>([]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [region, setRegion] = useState(0);

    useEffect(() => {
        const parsedMapInfo = mapInfo;
        setHeight(parsedMapInfo.MapHeight);
        setRegion(parsedMapInfo.Region);
        setWidth(parsedMapInfo.MapWidth);
        let tiles: IMapTile[] = parsedMapInfo.Tiles;
        tiles = tiles.sort(mapTileComparator);
        setMapTiles(tiles);
    }, []);

    const getTileInfo = useCallback((x: number, y: number): IMapTile => {
        return mapTiles[x + y * width];
    }, [mapTiles, width]);

    /*   const handleMapLoad = useCallback((e: MapInfo) => {
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
    /* send({Controller: "Map", Method: "get_map"});
     return () => {
         removeListener("MapLoad", handleMapLoad);
         removeListener("TileUpdate", handleTileUpdate);
     }
 }, [addListener, handleMapLoad, handleTileUpdate, send]);*/

    const values = useMemo(() => {
        return {
            mapTiles,
            width,
            height,
            getTileInfo
        }
    }, [width, height, mapTiles, getTileInfo]);


    return (
        <MapContext.Provider value={values}>{props.children}</MapContext.Provider>
    );
}

export default MapContextProvider;