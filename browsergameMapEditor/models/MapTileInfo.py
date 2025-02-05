from models.Color import Color


class MapTileInfo:
    def __init__(self, color: Color, type: str):
        self.color = color
        self.type = type