import {PixiComponent} from "@pixi/react";
import {Graphics} from "pixi.js";
import {TILE_SIZE} from "./component/constants.ts";

interface PlayerProps {
    x: number;
    y: number;
}

const Player = PixiComponent<PlayerProps, Graphics>('Player', {
    create: () => new Graphics(),
    applyProps: (instance, oldProps: PlayerProps, newProps: PlayerProps) => {
        const {x, y} = newProps;
        const {x: oldX, y: oldY} = oldProps;

        if (x !== oldX || y !== oldY) {
            instance.clear();
            instance.beginFill('#080808')
            instance.drawCircle(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE / 2);
            instance.endFill();
        }
    }
});

export default Player;