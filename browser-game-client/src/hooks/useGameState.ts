import { useContext } from 'use-context-selector';
import {GameStateContext} from "../context/GameStateProvider.tsx";

const useGameState = () => {
    const context =  useContext(GameStateContext)
    if(!context){
        throw new Error("No GameStateContext.Provider found when calling useGameState");
    }
    return context;
}

export default useGameState;

