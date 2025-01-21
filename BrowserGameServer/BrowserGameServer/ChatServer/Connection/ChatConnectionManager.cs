using System.Collections.Concurrent;
using System.Net.WebSockets;
using BrowserGameServer.connection;

namespace BrowserGameServer.ChatServer.Connection;

public class ChatConnectionManager : IConnectionManager
{
    private static ConcurrentDictionary<string, IConnection> _connections = new();
    private static ConcurrentDictionary<string, string> _users = new();

    public IConnection GetConnectionById(string id)
    {
        return _connections.FirstOrDefault(p => p.Key == id).Value;
    }

    public ConcurrentDictionary<string, IConnection> GetAllConnections()
    {
        return _connections;
    }

    public List<string> GetAllUsernames()
    {
        return _users.Select(p => p.Key).ToList();
    }

    public string GetId(IConnection connection)
    {
        return _connections.FirstOrDefault(p => p.Value == connection).Key;
    }

    public string GetUsernameByConnectionId(string connectionId)
    {
        return _users.FirstOrDefault(p => p.Value == connectionId).Key;
    }

    public string GetUsernameByConnection(IConnection connection)
    {
        string connectionId = GetId(connection);
        return GetUsernameByConnectionId(connectionId);
    }

    public void AddConnection(IConnection connection)
    {
        string connectionId = CreateConnectionId();
        _connections.TryAdd(connectionId, connection);
    }

    public void AddUser(IConnection connection, string username)
    {
        string connectionId = GetId(connection);
        _users.TryAdd(username, connectionId);
    }

    public async Task RemoveConnection(IConnection connection, string description = "Connection closed")
    {
        string id = GetId(connection);        
        if (!string.IsNullOrEmpty(id))
        {
            _connections.TryRemove(id, out _);
        }

        if (connection.GetState() != WebSocketState.Aborted)
        {
            await connection.Close(
             closeStatus: WebSocketCloseStatus.NormalClosure,
                 statusDescription: description,
                 cancellationToken: CancellationToken.None);
        }
    }

    public void RemoveUser(string username)
    {
        _users.TryRemove(username, out _);
    }

    public bool UsernameAlreadyExists(string username)
    {
        return _users.ContainsKey(username);
    }

    private string CreateConnectionId()
    {
        return Guid.NewGuid().ToString();
    }
}