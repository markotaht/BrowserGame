import {PixiComponent} from "@pixi/react";
import {IMapTile} from "../context/GameContext.tsx";
import {Graphics} from 'pixi.js';
import {TILE_SIZE} from "../component/constants.ts";

interface MapTileProps {
    mapTile: IMapTile;
}

const convertToHex = (color: number): string => {
    if (color < 0) {
        color = 0
    } else if (color > 255) {
        color = 255
    }
    const hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgb = (r: number, g: number, b: number): string => (
    (convertToHex(r) + convertToHex(g) + convertToHex(b)).toUpperCase()
)

const MapTile = PixiComponent<MapTileProps, Graphics>('MapTile', {
    create: () => new Graphics(),
    applyProps: (instance: Graphics, _: Readonly<object | MapTileProps>, newProps: Readonly<MapTileProps>) => {
        instance.x = newProps.mapTile.x * TILE_SIZE;
        instance.y = newProps.mapTile.y * TILE_SIZE;
        instance.beginFill(rgb(newProps.mapTile.color.R, newProps.mapTile.color.G, newProps.mapTile.color.B));
        instance.drawRect(0,0, TILE_SIZE, TILE_SIZE);
        instance.endFill();
    }
});

export default MapTile;