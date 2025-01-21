import usePlayer from "../../hooks/usePlayer.ts";
import useMap from "../../hooks/useMap.ts";

const TileInfo = () => {
    const {x,y} = usePlayer();
    const {mapTiles} = useMap();

    if(mapTiles.length === 0){
        return null;
    }
    const tile= mapTiles[x + y * 10];
    return (
        <div style={{background: "white", color: "black", height: "100%"}}>
            {JSON.stringify(tile.color)}
        </div>
    )
}

export default TileInfo;