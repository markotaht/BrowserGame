import PlayerController from "../PlayerController.tsx";
import ContextStage from "../component/ContextStage.tsx";
import useMap from "../hooks/useMap.ts";
import MapTile from "./MapTile.tsx";
import {TILE_SIZE} from "../component/constants.ts";
import {Container} from "@pixi/react";
import usePlayer from "../hooks/usePlayer.ts";
import Player from "../Player.ts";

const GameMap = () => {
    const {mapTiles, width, height} = useMap();
    const {x,y} = usePlayer();
    const viewCenter = {x: 800 / TILE_SIZE / 2, y: 600 / TILE_SIZE / 2};


    const mapSize = 30 * TILE_SIZE;
    const mapPivot = {x : x * TILE_SIZE,y :y * TILE_SIZE};

    return (<div>
        <ContextStage width={800} height={600} options={{background: 0x1099bb}}>
            <Container x={400} y={300} width={mapSize} height={mapSize} pivot={mapPivot}>
                {mapTiles.map(tile => <MapTile mapTile={tile}/>)}
            </Container>
            <Player x={viewCenter.x} y={viewCenter.y}/>
        </ContextStage>
    </div>);
}

export default GameMap;