from models.JSONAble import JSONAble


class Color(JSONAble):
    def __init__(self, r: int, g: int, b: int):
        super().__init__()
        self.R = r
        self.G = g
        self.B = b

    def asHex(self) -> str:
        return "#%02x%02x%02x" % (self.R,self.G,self.B)

    @staticmethod
    def fromHex(value: str):
        value = value.lstrip('#')
        lv = len(value)
        values = tuple(int(value[i:i + lv // 3], 16) for i in range(0, lv, lv // 3))
        return Color(values[0], values[1], values[2])