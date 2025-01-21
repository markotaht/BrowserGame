using System.Net.WebSockets;
using System.Text;
using BrowserGameServer.connection;

namespace BrowserGameServer.ChatServer.Connection;

public class ChatConnectionHandler
{
    private readonly ChatConnectionManager _chatConnectionManager;
    private readonly ChatHandler _chatHandler;

    public ChatConnectionHandler(ChatConnectionManager chatConnectionManager, ChatHandler chatHandler)
    {
        _chatConnectionManager = chatConnectionManager;
        _chatHandler = chatHandler;
    }

    public async Task OnConnected(IConnection connection, String username)
    {
        string connectionError = ValidateUsername(username);

        if (!string.IsNullOrEmpty(connectionError))
        {
            await _chatConnectionManager.RemoveConnection(connection, connectionError);
        }
        else
        {
            _chatConnectionManager.AddConnection(connection);
            _chatConnectionManager.AddUser(connection, username);
            await _chatHandler.UserConnected(username);
        }
    }
    
    public string ValidateUsername(string username)
    {
        if (String.IsNullOrEmpty(username))
        {
            return $"Username must not be empty";
        }

        if (_chatConnectionManager.UsernameAlreadyExists(username))
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
                    await _chatHandler.HandleMessage(receivedMessage, connection);
                }
            }
        } while (message.MessageType != WebSocketMessageType.Close);

        return message.CloseStatus;
    }

    public async Task HandleDisconnect(IConnection connection)
    {
        string username = await OnDisconnected(connection);
        await _chatHandler.UserDisconnected(username);
    }

    public async Task<string> OnDisconnected(IConnection connection)
    {
        string socketId = _chatConnectionManager.GetId(connection);
        await _chatConnectionManager.RemoveConnection(connection);

        string username = _chatConnectionManager.GetUsernameByConnectionId(socketId);
        _chatConnectionManager.RemoveUser(username);

        return username;
    }
}