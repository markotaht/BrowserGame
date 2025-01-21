namespace BrowserGameServer.GameServer;

public class ClientGameRPCError
{
    public int Code { get; set; }
    public string? Message { get; set; }
    public Dictionary<string, object>? Data { get; set; }

    public ClientGameRPCError(int code, string? message = null, Dictionary<string, object>? data = null)
    {
        Code = code;
        Message = message;
        Data = data;
    }
}