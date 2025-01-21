namespace BrowserGameServer.GameServer;

public class ServerEvent
{
    public String EventType { get; set; }
    public Object Data { get; set; }
    
    public ServerEvent(string eventType, object data)
    {
        EventType = eventType;
        Data = data;
    }
}