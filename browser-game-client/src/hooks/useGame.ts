import {useContext} from "react";
import {SocketContext} from "../context/SocketContext.tsx";

const useGame = () => {
    return useContext(SocketContext);
}

export default useGame;