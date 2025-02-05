import useGameState from "../hooks/useGameState.ts";

const PlayerInventory = () => {
    const {playerState} = useGameState();

    return (
        <ul>
            {playerState.inventory.map((item: IMapTileContent) => <li key={item.id}>{item.title}</li>)}
        </ul>
    );
}

export default PlayerInventory;