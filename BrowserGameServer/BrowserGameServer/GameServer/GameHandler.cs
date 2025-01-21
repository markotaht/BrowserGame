using System.Net.WebSockets;
using System.Text.Json;
using BrowserGameServer.ChatServer;
using BrowserGameServer.connection;
using BrowserGameServer.GameServer.Connection;
using BrowserGameServer.GameServer.GameControllers;

namespace BrowserGameServer.GameServer;

public class GameHandler
{
    private readonly GameConnectionManager _gameConnectionManager;
    private readonly MapController _mapController;

    public GameHandler(GameConnectionManager gameConnectionManager)
    {
        _gameConnectionManager = gameConnectionManager;
        _mapController = new MapController(gameConnectionManager);
    }
    
    public async Task HandleMessage(string message, IConnection connection)
    {
        ClientGameRPCRequest clientRequest = TryDeserializeClientMessage(message);

        if (clientRequest == null)
        {
            return;
        }

        ServerEvent result = await HandleRequest(clientRequest);
        if (result == null)
        {
            return;
        }
        
        await connection.Send(JsonSerializer.Serialize(result));

        /*  if (clientMessage.IsTypeConnection())
          {
              // For future improvements
          }
          else if (clientMessage.IsTypeChat())
          {
              string expectedUsername = _gameConnectionManager.GetUsernameByConnection(connection);

              if (clientMessage.IsValid(expectedUsername))
              {
                  ClientGameRPCResponse chatMessage = new ClientGameRPCResponse(clientMessage);
              //    await BroadcastMessage(JsonSerializer.Serialize(chatMessage));
              }
          }*/
    }

    public Task<ServerEvent> HandleRequest(ClientGameRPCRequest clientRequest)
    {
        switch (clientRequest.Controller)
        {
            case "Map":
                return _mapController.HandleRpcRequest(clientRequest.Method, clientRequest.Arguments);
            default:
                return Task.FromResult(new ServerEvent("Error", new ClientGameRPCError(1000, "Controller not found")));
        }
    }
    public async Task UserConnected(string username)
    {
        ServerMessage disconnectMessage =
            new ServerMessage(username, false, _gameConnectionManager.GetAllUsernames());
        
        await SendMessageToAllAsync(JsonSerializer.Serialize(disconnectMessage));
    }

    public async Task UserDisconnected(string username)
    {
        ServerMessage disconnectMessage =
            new ServerMessage(username, true, _gameConnectionManager.GetAllUsernames());
        
        await SendMessageToAllAsync(JsonSerializer.Serialize(disconnectMessage));
    }
    
    private ClientGameRPCRequest TryDeserializeClientMessage(string str)
    {
        try
        {
            return JsonSerializer.Deserialize<ClientGameRPCRequest>(str);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: invalid message format");
            return null;
        }
    }
    
    private async Task SendMessageToAllAsync(string message)
    {
        foreach (var pair in _gameConnectionManager.GetAllConnections())
        {
            if (pair.Value.GetState() == WebSocketState.Open)
                await pair.Value.Send(message);
        }
    }
}