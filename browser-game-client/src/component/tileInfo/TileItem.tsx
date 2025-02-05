import React, {ReactNode, useCallback} from 'react';
import './TileItem.css';
import {IMapTileContent} from "../../context/SocketContext.tsx";

interface TileItemProps {
    item: IMapTileContent;
    TileIcon: ReactNode;
    onContextMenu: (event: React.MouseEvent, item: IMapTileContent) => void;
}

const TileItem = ({item, TileIcon, onContextMenu}: TileItemProps) => {
    const onContextMenuCallback = useCallback((event: React.MouseEvent) => {
        onContextMenu(event, item);
    }, [item, onContextMenu]);

    return <>
        <div className={'tile-item'} onContextMenu={onContextMenuCallback}>
            <TileIcon className={'tile-item-icon'}/>
            <div className={'tile-item-description'}>
                <div className={'tile-item-title'}>{item.title}</div>
                <div className={'tile-item-subtitle'}>{item.subtitle}</div>
            </div>
        </div>
    </>;
}

export default React.memo(TileItem);