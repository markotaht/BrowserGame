namespace BrowserGameServer.GameServer.Map;

public class MapInfo
{
    public int MapWidth { get; init; }
    public int MapHeight { get; init; }
    
    public int Region { get; init; }
    public List<MapTile> Tiles { get; init; }

    public MapInfo(int mapWidth, int mapHeight, int region, List<MapTile> tiles)
    {
        MapWidth = mapWidth;
        MapHeight = mapHeight;
        Tiles = tiles;
        Region = region;
    }
}