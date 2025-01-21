using System.Drawing;
using System.Numerics;

namespace BrowserGameServer.GameServer.Map;

public struct MapTile
{
    public int x { get; set; }
    public int y { get; set; }
    public int region { get; set; }
    public Color color { get; set; }

    public MapTile(int x, int y, int region, Color color)
    {
        this.x = x;
        this.y = y;
        this.region = region;
        this.color = color;
    }
}