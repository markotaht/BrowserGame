import ContextBridge from "./ContextBridge.tsx";
import {Stage} from "@pixi/react";
import React, {ReactNode} from "react";
import {MapContext} from "../context/MapContext.tsx";
import {GameStateContext} from "../context/GameStateProvider.tsx";

interface ContextStageProps {
    [x: string]: any;

    children: ReactNode[];
}

const ContextStage = ({children, ...props}: ContextStageProps) => {
    return (
        <ContextBridge
            Context={MapContext}
            render={(children: any) =>
                <ContextBridge
                    Context={GameStateContext}
                    render={(children) => <Stage {...props}>{children}</Stage>}
                >
                    {children}
                </ContextBridge>
            }>
            {children}
        </ContextBridge>
    )
}


export default React.memo(ContextStage);