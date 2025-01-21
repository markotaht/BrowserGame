using System.Net.WebSockets;
using System.Text.Json;
using BrowserGameServer.GameServer.Connection;
using BrowserGameServer.GameServer.Map;
using Color = BrowserGameServer.GameServer.Map.Color;

namespace BrowserGameServer.GameServer.GameControllers;

public class MapController
{
    private static ConcurrentList<MapTile> mapTiles = new ();
    private readonly GameConnectionManager _gameConnectionManager;

    public MapController(GameConnectionManager gameConnectionManager)
    {
        _gameConnectionManager = gameConnectionManager;
        if (mapTiles.Count == 0)
        {
            GenerateMap();
        }

        RunAsync();
    }

    public async Task RunAsync()
    {
        var periodicTimer= new PeriodicTimer(TimeSpan.FromSeconds(1));
        while (await periodicTimer.WaitForNextTickAsync())
        {
            RandomUpdate();
        }
    }
    public Task<ServerEvent> HandleRpcRequest(string methodName, object[] parameters)
    {
        ServerEvent result;
        switch (methodName)
        {
            case "get_map":
                result = new ServerEvent("MapLoad", GetMap());
                break;
            default:
                result = new ServerEvent("Error", new ClientGameRPCError(1000, "Method not found"));
                break;
                
        }
        return Task.FromResult(result);
    }
    
    public object GetMap()
    {
        return new MapInfo(30, 30, 1, mapTiles.ToList());
    }

    private void GenerateMap()
    {
        Random rnd = new Random();
        mapTiles.Clear();
        for (var y = 0; y < 30; y++)
        {
            for (int x = 0; x < 30; x++)
            {
                mapTiles.Add(new MapTile(x,y,1, new Color(rnd.Next(256), rnd.Next(256), rnd.Next(256))));
            }
        }
    }

    private async void RandomUpdate()
    {
        Random rnd = new Random();
        int x = rnd.Next(0, 10);
        int y = rnd.Next(0, 10);

        MapTile newTile = new MapTile(x, y, 1, new Color(rnd.Next(256), rnd.Next(256), rnd.Next(256)));
        mapTiles[x + y * 10] = newTile;
        foreach (var pair in _gameConnectionManager.GetAllConnections())
        {
            if (pair.Value.GetState() == WebSocketState.Open)
                await pair.Value.Send(JsonSerializer.Serialize(new ServerEvent("TileUpdate", newTile)));
        }
    }
}