using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using BrowserGameServer.ChatServer.Connection;
using BrowserGameServer.connection;

namespace BrowserGameServer.ChatServer;

public class ChatHandler
{
    private readonly ChatConnectionManager _chatConnectionManager;

    public ChatHandler(ChatConnectionManager chatConnectionManager)
    {
        _chatConnectionManager = chatConnectionManager;
    }

    public async Task HandleMessage(string message, IConnection connection)
    {
        ClientMessage clientMessage = TryDeserializeClientMessage(message);

        if (clientMessage == null)
        {
            return;
        }

        if (clientMessage.IsTypeConnection())
        {
            // For future improvements
        }
        else if (clientMessage.IsTypeChat())
        {
            string expectedUsername = _chatConnectionManager.GetUsernameByConnection(connection);

            if (clientMessage.IsValid(expectedUsername))
            {
                ServerMessage chatMessage = new ServerMessage(clientMessage);
                await BroadcastMessage(JsonSerializer.Serialize(chatMessage));
            }
        }
    }

    public async Task UserConnected(string username)
    {
        ServerMessage disconnectMessage =
            new ServerMessage(username, false, _chatConnectionManager.GetAllUsernames());
        
        await SendMessageToAllAsync(JsonSerializer.Serialize(disconnectMessage));
    }

    public async Task UserDisconnected(string username)
    {
        ServerMessage disconnectMessage =
            new ServerMessage(username, true, _chatConnectionManager.GetAllUsernames());
        
        await SendMessageToAllAsync(JsonSerializer.Serialize(disconnectMessage));
    }
    
    private ClientMessage TryDeserializeClientMessage(string str)
    {
        try
        {
            return JsonSerializer.Deserialize<ClientMessage>(str);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: invalid message format");
            return null;
        }
    }

    private async Task BroadcastMessage(string message)
    {
        await SendMessageToAllAsync(message);
    }
    
    private async Task SendMessageToAllAsync(string message)
    {
        foreach (var pair in _chatConnectionManager.GetAllConnections())
        {
            if (pair.Value.GetState() == WebSocketState.Open)
                await pair.Value.Send(message);
        }
    }
    
    public async Task SendMessageAsync(WebSocket socket, string message)
    {
        if (socket.State != WebSocketState.Open)
            return;

        await socket.SendAsync(buffer: new ArraySegment<byte>(array: Encoding.ASCII.GetBytes(message),
                offset: 0,
                count: message.Length),
            messageType: WebSocketMessageType.Text,
            endOfMessage: true,
            cancellationToken: CancellationToken.None);
    }

}