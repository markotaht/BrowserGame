import React, {useCallback, useEffect, useState} from "react";
import Info from '../../assets/info.svg'
import Color from '../../assets/colorpallet.svg'
import Coordinates from '../../assets/coords.svg'
import useContextMenu from "../../hooks/useContextMenu.ts";
import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import {ITileItem} from "./ITileItem.ts";
import TileItems from "./TileItems.tsx";
import {TileItemType} from "./TyleItemType.ts";
import useGameLogic from "../../hooks/useGameLogic.ts";
import TreeContextMenu from "../ContextMenu/TreeContextMenu.tsx";
import {IBaseNode} from "../../data/IBaseNode.ts";
import usePlayerLocation from "../../hooks/usePlayerLocation.ts";

const TileContents = () => {
    const {clicked, onClick, points} = useContextMenu();
    const {getTileInfo} = useGameLogic();
    const {x,y} = usePlayerLocation();
    const [selectedItem, setSelectedItem] = useState<IBaseNode |undefined>();
    const [items, setItems] = useState<ITileItem[]>([]);

    const onContextMenu = useCallback((e: React.MouseEvent, item: IBaseNode) => {
        onClick(e);
        setSelectedItem(item);
    }, [onClick]);

    useEffect(() => {
        if(!clicked){
            setSelectedItem(undefined);
        }
    }, [clicked]);

    useEffect(() => {
        const tile = getTileInfo(x,y);
        if(tile !== undefined) {
            const items: ITileItem[] = [
                {
                    icon: Info,
                    item: {
                        name: 'Type',
                        description: tile.type,
                        type: TileItemType.INFO,
                        id: "type",
                        image: "",
                        drops: []
                    },
                },
                {
                    icon: Color,
                    item: {
                        name: 'Color',
                        description: `r: ${tile.color.R},g: ${tile.color.G},b:${tile.color.B}`,
                        type: TileItemType.COLOR,
                        id: "color",
                        image: "",
                        drops: []
                    },
                },
                {
                    icon: Coordinates,
                    item: {
                        name: 'Coordinates',
                        description: `x: ${x},y: ${y}`,
                        type: TileItemType.COORD,
                        id: "coord",
                        image: "",
                        drops: []
                    },
                }
            ];
            if(tile.contents){
                setItems([...items, ...tile.contents.map((content: IBaseNode) => {
                    return {
                        icon: Info,
                        item: content
                    }
                })])
            } else {
                setItems(items);
            }
        } else {
            setItems([]);
        }
    }, [getTileInfo, x, y]);
    
    return (
        <div style={{background: "white", color: "black", height: "100%"}}>
            <TileItems items={items} onContextMenu={onContextMenu} />
            {clicked && (
                <ContextMenu x={points.x} y={points.y}>
                    <TreeContextMenu item={selectedItem!}/>
                </ContextMenu>
            )}
        </div>
    )
}

export default React.memo(TileContents);