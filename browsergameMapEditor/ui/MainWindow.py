import json
import types
from tkinter import *

from models.Color import Color
from models.MapInfo import MapInfo
from models.MapTile import MapTile
from models.MapTileInfo import MapTileInfo
from ui.SideMenu import SideMenu
from ui.TileSelector import TileSelector

TILE_WIDTH = 6
TILE_HEIGHT = 3

class MainWindow:
    def __init__(self):
        self.tiles = []

    def initialize(self):
        window = Tk()
        self.root = Frame(window)

        self.sideMenu = SideMenu()
        sideMenuFrame = self.sideMenu.initialize(window)

        self.sideMenu.jsonButton.config(command=self.__bind(self, self.printJSON))
        self.sideMenu.generateMap.config(command=self.__bind(self, self.initializeMap))

        tiles = [
            MapTileInfo(Color(0, 255, 0), 'GRASS'),
            MapTileInfo(Color(0, 0, 255), 'WATER'),
            MapTileInfo(Color(255, 222, 33), 'SAND'),
            MapTileInfo(Color(137, 137, 137), 'ROCK'),
            MapTileInfo(Color(255, 255, 255), 'SNOW')
        ]

        self.tileSelector = TileSelector(tiles)
        tileSelectorFrame = self.tileSelector.initialize(window)

        sideMenuFrame.pack(side=RIGHT)
        tileSelectorFrame.pack(side=BOTTOM)
        self.root.pack()

        window.mainloop()

    def printJSON(self):
        mapInfo = MapInfo(self.sideMenu.getMapWidth(),self.sideMenu.getMapHeight(),self.sideMenu.getRegion(),self.tiles)
        f = open("Region.json", "w")
        f.write(mapInfo.toJSON())
        f.close()

    def initializeMap(self):
        mapWidth = self.sideMenu.getMapWidth()
        mapHeight = self.sideMenu.getMapHeight()
        region = self.sideMenu.getRegion()

        self.tiles = [self.createTile(x, y, region, Color(255, 255, 255), 'SNOW') for x in range(mapWidth) for y in range(mapHeight)]

    def changeColor(self, label, tile: MapTile):
        label.config(bg=self.tileSelector.selectedTile.color.asHex())
        tile.color = self.tileSelector.selectedTile.color
        tile.type = self.tileSelector.selectedTile.type

    def createTile(self, x, y,region, color: Color, tileType: str):
        tile = MapTile(x,y,region,color, tileType)
        label = Label(self.root, background=color.asHex(), width=TILE_WIDTH, height=TILE_HEIGHT)
        label.grid(row=y, column=x)
        label.bind("<Button-1>", lambda e: self.changeColor(label, tile))

        return tile

    def __bind(self,instance, func):
        name = func.__name__
        bound_func = func.__get__(instance, instance.__class__)
        setattr(instance, name, bound_func)
        return bound_func