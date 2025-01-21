import ContextBridge from "./ContextBridge.tsx";
import {PlayerContext} from "../context/PlayerContext.tsx";
import {Stage} from "@pixi/react";
import {ReactNode} from "react";

interface ContextStageProps {
    [x: string]: any;

    children: ReactNode[];
}

const ContextStage = ({children, ...props}: ContextStageProps) => {
    return (
        <ContextBridge
            Context={PlayerContext}
            render={(children) => <Stage {...props}>{children}</Stage>}>
            {children}
        </ContextBridge>
    );
}


export default ContextStage;