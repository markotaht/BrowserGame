import React, {useCallback, useEffect, useState} from "react";
import Info from '../../assets/info.svg'
import Color from '../../assets/colorpallet.svg'
import Coordinates from '../../assets/coords.svg'
import useContextMenu from "../../hooks/useContextMenu.ts";
import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import {IMapTileContent} from "../../context/SocketContext.tsx";
import {ITileItem} from "./ITileItem.ts";
import TileItems from "./TileItems.tsx";
import {TileItemType} from "./TyleItemType.ts";
import useGameLogic from "../../hooks/useGameLogic.ts";
import useGameState from "../../hooks/useGameState.ts";
import TreeContextMenu from "../ContextMenu/TreeContextMenu.tsx";

const TileContents = () => {
    const {clicked, onClick, points} = useContextMenu();
    const {playerState} = useGameState()
    const {getTileInfo} = useGameLogic();
    const {location} = playerState;
    const {x,y} = location;
    const [selectedItem, setSelectedItem] = useState<IMapTileContent>();
    const [items, setItems] = useState<ITileItem[]>([]);

    const onContextMenu = useCallback((e: React.MouseEvent, item: IMapTileContent) => {
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
        console.log(tile);
        if(tile !== undefined) {
            const items: ITileItem[] = [
                {
                    icon: Info,
                    item: {
                        title: 'Type',
                        subtitle: tile.type,
                        type: TileItemType.INFO,
                        id:"type"
                    },
                },
                {
                    icon: Color,
                    item: {
                        title: 'Color',
                        subtitle: `r: ${tile.color.R},g: ${tile.color.G},b:${tile.color.B}`,
                        type: TileItemType.COLOR,
                        id: "color"
                    },
                },
                {
                    icon: Coordinates,
                    item: {
                        title: 'Coordinates',
                        subtitle: `x: ${x},y: ${y}`,
                        type: TileItemType.COORD,
                        id:"coord"
                    },
                }
            ];
            if(tile.contents){
                setItems([...items, ...tile.contents.map(content => {
                    return {
                        icon: Info,
                        item: {
                            title: content.title,
                            subtitle: content.subtitle,
                            type: content.type,
                            id: "wood"
                        }
                    }
                })])
            } else {
                setItems(items);
            }
        } else {
            setItems([]);
        }
    }, [getTileInfo, location]);
    
    return (
        <div style={{background: "white", color: "black", height: "100%"}}>
            <TileItems items={items} onContextMenu={onContextMenu} />
            {clicked && (
                <ContextMenu x={points.x} y={points.y}>
                    <TreeContextMenu item={selectedItem}/>
                </ContextMenu>
            )}
        </div>
    )
}

export default React.memo(TileContents);