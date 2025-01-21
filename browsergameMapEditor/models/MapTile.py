from models.Color import Color
from models.JSONAble import JSONAble


class MapTile(JSONAble):
    def __init__(self, x: int, y: int, region: int, color: Color):
        super().__init__()
        self.x = x
        self.y = y
        self.region = region
        self.color = color
