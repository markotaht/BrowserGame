import { useContextSelector } from 'use-context-selector';
import {GameStateContext} from "../context/GameStateProvider.tsx";

const usePlayerInventory = () => {
    const context =  useContextSelector(GameStateContext, (context) => context?.playerState.inventory);
    if(!context){
        throw new Error("No GameStateContext.Provider found when calling usePlayerInventory");
    }
    return context;
}

export default usePlayerInventory;