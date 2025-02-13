import React, {useMemo} from "react";
import {ITileItem} from "./ITileItem.ts";
import TileItem from "./TileItem.tsx";
import {IBaseNode} from "../../data/IBaseNode.ts";

interface TileItemProps {
    items: ITileItem[];
    onContextMenu: (e: React.MouseEvent, item: IBaseNode) => void
}

const TileItems = ({items, onContextMenu}: TileItemProps) => {
    const itemElements = useMemo(() => items.map(
        (item: ITileItem) =>
            <TileItem item={item.item} TileIcon={item.icon}
                      onContextMenu={onContextMenu}/>
    ), [items, onContextMenu]);

    return (
        <React.Fragment>
            {itemElements}
        </React.Fragment>);
}

export default React.memo(TileItems);