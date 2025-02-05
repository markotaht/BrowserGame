import {useContext} from "react";
import {GameLogicContext} from "../context/GameLogicProvider.tsx";

const useGameLogic = () => {
    const context =  useContext(GameLogicContext)
    if(!context){
        throw new Error("No GameLogicContext.Provider found when calling useMap");
    }
    return context;
}

export default useGameLogic;