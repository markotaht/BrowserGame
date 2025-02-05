import {useContext} from "react";
import {GameStateContext} from "../context/GameStateProvider.tsx";

const useGameState = () => {
    const context =  useContext(GameStateContext)
    if(!context){
        throw new Error("No GameStateContext.Provider found when calling useMap");
    }
    return context;
}

export default useGameState;

