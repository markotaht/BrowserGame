from itertools import count
from tkinter import Frame, Label
from typing import List

from models.MapTileInfo import MapTileInfo

TILE_WIDTH = 6
TILE_HEIGHT = 3

class TileSelector:
    def __init__(self, tiles: List[MapTileInfo]):
        self.tiles = tiles
        self.selectedTile: MapTileInfo = None

    def initialize(self, root) -> Frame:
        parent = Frame(root)
        for i, tile in zip(count(), self.tiles):
            label = self.__createLabel(parent, tile)
            label.grid(row=1, column=(1+i*2))
        return parent

    def __selectTile(self, tile: MapTileInfo):
        self.selectedTile = tile

    def __createLabel(self, parent:Frame, tile: MapTileInfo) -> Label:
        label = Label(parent, background=tile.color.asHex(), width=TILE_WIDTH, height=TILE_HEIGHT)
        label.bind("<Button-1>", lambda e: self.__selectTile(tile))
        return label