using BrowserGameServer.GameServer.Connection;
using Microsoft.AspNetCore.Mvc;

namespace BrowserGameServer.GameServer.SocketController;

[ApiController]
public class GameController : ControllerBase
{
    private readonly GameConnectionHandler _gameConnectionHandler;

    public GameController(GameConnectionHandler gameConnectionHandler)
    {
        _gameConnectionHandler = gameConnectionHandler;
    }
    
    [Route("/api/game/ws")]
    public async Task<IActionResult> Get()
    {
        var context = ControllerContext.HttpContext;

        if (context.WebSockets.IsWebSocketRequest)
        {
            string username = context.Request.Query["username"];
            var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            var connection = new BrowserGameServer.Connection.Connection(webSocket);

            await _gameConnectionHandler.OnConnected(connection, username);
            await _gameConnectionHandler.KeepReceiving(connection);
            await _gameConnectionHandler.HandleDisconnect(connection);

            return new EmptyResult();
        }
        else
        {
            return new BadRequestResult();
        }
    }
}