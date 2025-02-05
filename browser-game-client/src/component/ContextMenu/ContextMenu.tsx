import React, {ReactNode} from "react";
import './ContextMenu.css'

interface ContextMenuProps {
    children: ReactNode;
    x: number,
    y: number
}

const ContextMenu = ({x,y, children}: ContextMenuProps) => {
    const style: React.CSSProperties = {
        left: x + 'px',
        top: y + 'px',
    }

    return (
        <div className="context-menu" style={style}>
            {children}
        </div>);

}

export default React.memo(ContextMenu);