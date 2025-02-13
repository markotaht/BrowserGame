import { useContextSelector } from 'use-context-selector';
import {GameStateContext} from "../context/GameStateProvider.tsx";

const usePlayerLocation = () => {
    const context =  useContextSelector(GameStateContext, (context) => context?.playerState.location);
    if(!context){
        throw new Error("No GameStateContext.Provider found when calling usePlayerLocation");
    }
    return context;
}

export default usePlayerLocation;