using System.Net.WebSockets;
using System.Text;
using BrowserGameServer.connection;

namespace BrowserGameServer.Connection;

public class Connection: IConnection
{
    private readonly WebSocket _webSocket;

    public Connection(WebSocket webSocket)
    {
        _webSocket = webSocket;
    }

    public async Task<WebSocketReceiveResult> ReceiveMessage(Stream memoryStream)
    {
        var readBuffer = new ArraySegment<byte>(new byte[4 * 1024]);
        WebSocketReceiveResult result;
        do
        {
            result = await _webSocket.ReceiveAsync(readBuffer, CancellationToken.None);
            await memoryStream.WriteAsync(readBuffer.Array, readBuffer.Offset, result.Count,
                CancellationToken.None);
        } while (!result.EndOfMessage);

        return result;
    }

    public async Task Send(string message)
    {
        var bytes = Encoding.UTF8.GetBytes(message);
        await _webSocket.SendAsync(new ArraySegment<byte>(bytes, 0, bytes.Length), WebSocketMessageType.Text, true,
            CancellationToken.None);
    }

    public async Task Close(WebSocketCloseStatus closeStatus,
        string? statusDescription,
        CancellationToken cancellationToken)
    {
        await _webSocket.CloseAsync(closeStatus, statusDescription, cancellationToken);
    }

    public WebSocketState GetState()
    {
        return _webSocket.State;
    }
}
