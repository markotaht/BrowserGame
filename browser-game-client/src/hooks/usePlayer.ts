import {useContext} from "react";
import {PlayerContext} from "../context/PlayerContext.tsx";

const usePlayer = () => {
    return useContext(PlayerContext)
}

export default usePlayer;