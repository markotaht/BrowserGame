import ContextStage from "../component/ContextStage.tsx";
import {TILE_SIZE} from "../component/constants.ts";
import Player from "../Player.ts";
import React, {useMemo} from "react";
import MapTileContainer from "./MapTileContainer.tsx";

const StageOptions = {background: 0x1099bb};

const GameMap = () => {
   const viewCenter = useMemo(() => {
        return {x: 800 / TILE_SIZE / 2, y: 600 / TILE_SIZE / 2};
    }, []);

    return (<div>
        <ContextStage width={800} height={600} options={StageOptions}>
            <MapTileContainer/>
            <Player x={viewCenter.x} y={viewCenter.y}/>
        </ContextStage>
    </div>);
}

export default React.memo(GameMap);