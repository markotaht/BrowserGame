namespace BrowserGameServer.GameServer;

public class ClientGameRPCRequest
{
    public string Controller { get; set; }
    public string Method { get; set; }
    public object[] Arguments { get; set; }
}