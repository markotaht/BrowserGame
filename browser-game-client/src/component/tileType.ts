export enum TileType {
    GRASS = 'GRASS',
    SNOW = 'SNOW',
    ROCK = 'ROCK',
    SAND = 'SAND',
    WATER = 'WATER',
}

export function canWalkOnTile(tile: TileType): boolean {
    switch (tile) {
        case TileType.GRASS:
        case TileType.SNOW:
        case TileType.SAND:
        case TileType.ROCK:
            return true;
        case TileType.WATER:
            return false;
    }
}