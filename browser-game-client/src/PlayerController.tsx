import Player from "./Player.ts";
import usePlayer from "./hooks/usePlayer.ts";

const PlayerController = () => {
    const {x, y} = usePlayer();
    return (<Player x={x} y={y}/>);
}
export default PlayerController;