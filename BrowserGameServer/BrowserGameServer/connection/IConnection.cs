using System.Net.WebSockets;

namespace BrowserGameServer.connection;

public interface IConnection
{

    Task<WebSocketReceiveResult> ReceiveMessage(Stream memoryStream);
    Task Send(string message);
    Task Close(WebSocketCloseStatus closeStatus,
        string? statusDescription,
        CancellationToken cancellationToken);
    WebSocketState GetState();
}