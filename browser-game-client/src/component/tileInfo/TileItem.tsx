import React, {ComponentType, useCallback} from 'react';
import './TileItem.css';
import {IBaseNode} from "../../data/IBaseNode.ts";

interface TileItemProps {
    item: IBaseNode;
    TileIcon: ComponentType<any>;
    onContextMenu: (event: React.MouseEvent, item: IBaseNode) => void;
}

const TileItem = ({item, TileIcon, onContextMenu}: TileItemProps) => {
    const onContextMenuCallback = useCallback((event: React.MouseEvent) => {
        onContextMenu(event, item);
    }, [item, onContextMenu]);

    return <>
        <div className={'tile-item'} onContextMenu={onContextMenuCallback}>
            <TileIcon className={'tile-item-icon'}/>
            <div className={'tile-item-description'}>
                <div className={'tile-item-title'}>{item.name}</div>
                <div className={'tile-item-subtitle'}>{item.description}</div>
            </div>
        </div>
    </>;
}

export default React.memo(TileItem);