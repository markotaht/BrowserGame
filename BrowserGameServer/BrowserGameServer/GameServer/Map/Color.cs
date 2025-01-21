namespace BrowserGameServer.GameServer.Map;

public struct Color
{
    public int R { get; init; }
    public int G { get; init; }
    public int B { get; init; }

    public Color(int r, int g, int b)
    {
        R = r;
        G = g;
        B = b;
    }
}