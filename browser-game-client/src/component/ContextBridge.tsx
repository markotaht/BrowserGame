import React, {Context, ReactNode} from "react";

interface ContextBridgeProps {
    children: ReactNode[];
    Context: Context<any>;
    render: (value: JSX.Element) => ReactNode;
}

const ContextBridge = ({children, Context, render}: ContextBridgeProps) => {
    return (
        <Context.Consumer>
            {(value) =>
                render(<Context.Provider value={value}>{children}</Context.Provider>)
            }
        </Context.Consumer>
    );
}

export default React.memo(ContextBridge);