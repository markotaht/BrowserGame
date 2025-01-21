using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace BrowserGameServer.connection;

public interface IConnectionManager
{
    ConcurrentDictionary<string, IConnection> GetAllConnections();
    
    void AddConnection(IConnection connection);
    Task RemoveConnection(IConnection connection, string description);
    
    void AddUser(IConnection connection, string username);
}