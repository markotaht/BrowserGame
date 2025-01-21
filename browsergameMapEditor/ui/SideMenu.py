from tkinter import *

class SideMenu:
    def initialize(self, root) -> Frame:
        parent = Frame(root)
        Label(parent, text="Region").grid(row=0)
        self.regionEntry = Entry(parent, width=10)
        self.regionEntry.grid(row=0, column=1)

        Label(parent, text="Width").grid(row=1)
        self.widthEntry = Entry(parent, width=10)
        self.widthEntry.grid(row=1, column=1)

        Label(parent, text="Height").grid(row=2)
        self.heightEntry = Entry(parent, width=10)
        self.heightEntry.grid(row=2, column=1)

        self.generateMap = Button(parent, text="GenerateMap")
        self.generateMap.grid(row=3)

        self.jsonButton = Button(parent, text="PrintJson")
        self.jsonButton.grid(row=4)

        return parent

    def getRegion(self):
        return int(self.regionEntry.get())

    def getMapWidth(self):
        return int(self.widthEntry.get())

    def getMapHeight(self):
        return int(self.heightEntry.get())