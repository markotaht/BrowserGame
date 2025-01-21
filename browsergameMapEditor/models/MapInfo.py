from typing import List

from models.JSONAble import JSONAble
from models.MapTile import MapTile


class MapInfo(JSONAble):
    def __init__(self, mapWidth: int, mapHeight: int, region: int, tiles: List[MapTile]):
        super().__init__()
        self.MapWidth = mapWidth
        self.MapHeight = mapHeight
        self.Region = region
        self.Tiles = tiles