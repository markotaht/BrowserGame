import {Stage} from "@pixi/react";
import React, {ReactNode} from "react";
import {GameStateContext} from "../context/GameStateProvider.tsx";
import {BridgeProvider, useBridgeValue} from "use-context-selector";

interface ContextStageProps {
    [x: string]: any;

    children: ReactNode[];
}

const ContextStage = ({children, ...props}: ContextStageProps) => {
    const gameStateValue = useBridgeValue(GameStateContext);
    return (
        <Stage {...props}>
            <BridgeProvider context={GameStateContext} value={gameStateValue}>
                {children}
            </BridgeProvider>
        </Stage>
    )
}


export default React.memo(ContextStage);