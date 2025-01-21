using System.Net.WebSockets;
using System.Text;
using BrowserGameServer.connection;

namespace BrowserGameServer.GameServer.Connection;

public class GameConnectionHandler
{
    private readonly GameConnectionManager _gameConnectionManager;
    private readonly GameHandler _gameHandler;

    public GameConnectionHandler(GameConnectionManager gameConnectionManager, GameHandler gameHandler)
    {
        _gameConnectionManager = gameConnectionManager;
        _gameHandler = gameHandler;
    }

    public async Task OnConnected(IConnection connection, String username)
    {
        string connectionError = ValidateUsername(username);

        if (!string.IsNullOrEmpty(connectionError))
        {
            await _gameConnectionManager.RemoveConnection(connection, connectionError);
        }
        else
        {
            _gameConnectionManager.AddConnection(connection);
            _gameConnectionManager.AddUser(connection, username);
            await _gameHandler.UserConnected(username);
        }
    }
    
    public string ValidateUsername(string username)
    {
        if (String.IsNullOrEmpty(username))
        {
            return $"Username must not be empty";
        }

        if (_gameConnectionManager.UsernameAlreadyExists(username))
        {
            return $"User {username} already exists";
        }

        return null;
    }

    public async Task<WebSocketCloseStatus?> KeepReceiving(IConnection connection)
    {
        WebSocketReceiveResult message;
        do
        {
            using (var memoryStream = new MemoryStream())
            {
                message = await connection.ReceiveMessage(memoryStream);
                if (message.Count > 0)
                {
                    var receivedMessage = Encoding.UTF8.GetString(memoryStream.ToArray());
                    Console.WriteLine($"Received message {receivedMessage}");
                    await _gameHandler.HandleMessage(receivedMessage, connection);
                }
            }
        } while (message.MessageType != WebSocketMessageType.Close);

        return message.CloseStatus;
    }

    public async Task HandleDisconnect(IConnection connection)
    {
        string username = await OnDisconnected(connection);
        await _gameHandler.UserDisconnected(username);
    }

    public async Task<string> OnDisconnected(IConnection connection)
    {
        string socketId = _gameConnectionManager.GetId(connection);
        await _gameConnectionManager.RemoveConnection(connection);

        string username = _gameConnectionManager.GetUsernameByConnectionId(socketId);
        _gameConnectionManager.RemoveUser(username);

        return username;
    }
}