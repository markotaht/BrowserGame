import {useContext} from "react";
import {GameContext} from "../context/GameContext.tsx";

const useGame = () => {
    return useContext(GameContext);
}

export default useGame;