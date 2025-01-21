using BrowserGameServer.ChatServer.Connection;
using Microsoft.AspNetCore.Mvc;

namespace BrowserGameServer.ChatServer.Controllers;

[ApiController]
public class ChatController : ControllerBase
{
    private readonly ChatConnectionHandler _chatConnectionHandler;

    public ChatController(ChatConnectionHandler chatConnectionHandler)
    {
        _chatConnectionHandler = chatConnectionHandler;
    }

    [Route("/api/chat/ws")]
    public async Task<IActionResult> Get()
    {
        var context = ControllerContext.HttpContext;

        if (context.WebSockets.IsWebSocketRequest)
        {
            string username = context.Request.Query["username"];
            var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            var connection = new BrowserGameServer.Connection.Connection(webSocket);

            await _chatConnectionHandler.OnConnected(connection, username);
            await _chatConnectionHandler.KeepReceiving(connection);
            await _chatConnectionHandler.HandleDisconnect(connection);

            return new EmptyResult();
        }
        else
        {
            return new BadRequestResult();
        }
    }
}