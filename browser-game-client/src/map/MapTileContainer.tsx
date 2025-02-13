import {Container} from "@pixi/react";
import {useMemo} from "react";
import {TILE_SIZE} from "../component/constants.ts";
import MapTile from "./MapTile.tsx";
import useGameState from "../hooks/useGameState.ts";
import React from "react";

const MapTileContainer = () => {
    const {playerState, mapState} = useGameState();
    const {location} = playerState;
    const {x,y} = location;
    const {tiles, width} = mapState;

    const mapWidth = useMemo(() => width * TILE_SIZE, [width]);
    const mapPivot = {x : x * TILE_SIZE,y :y * TILE_SIZE};

    const mapTileElements = useMemo(() => tiles.map(tile => <MapTile mapTile={tile}/>), [tiles]);

    return (
        <Container x={400} y={300} width={mapWidth} height={mapWidth} pivot={mapPivot}>
            {mapTileElements}
        </Container>
    );
}

export default React.memo(MapTileContainer);