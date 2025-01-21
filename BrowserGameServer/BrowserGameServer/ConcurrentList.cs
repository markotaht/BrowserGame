using System.Collections;

namespace BrowserGameServer;

public class ConcurrentList<T>: IList<T>
{
    private readonly List<T> _list = new();
    private readonly object _lock = new();

    public List<T> ToList()
    {
        return _list;
    }
    public IEnumerator<T> GetEnumerator()
    {
        throw new NotImplementedException();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }

    public void Add(T item)
    {
        lock (_lock)
        {
            _list.Add(item);
        }
    }

    public void Clear()
    {
        lock (_lock)
        {
            _list.Clear();
        }
    }

    public bool Contains(T item)
    {
        lock (_lock)
        {
            return _list.Contains(item);
        }
    }

    public void CopyTo(T[] array, int arrayIndex)
    {
        lock (_lock)
        {
            _list.CopyTo(array, arrayIndex);
        }
    }

    public bool Remove(T item)
    {
        lock (_lock)
        {
            return _list.Remove(item);
        }
    }

    public int Count { get; }
    public bool IsReadOnly { get; }
    public int IndexOf(T item)
    {
        lock (_lock)
        {
            return _list.IndexOf(item);
        }
    }

    public void Insert(int index, T item)
    {
        lock (_lock)
        {
            _list.Insert(index, item);
        }
    }

    public void RemoveAt(int index)
    {
        lock (_lock)
        {
            _list.RemoveAt(index);
        }
    }

    public T this[int index]
    {
        get => GetItem(index);
        set => SetItem(index, value);
    }

    public T GetItem(int index)
    {
        lock (_lock)
        {
            return _list[index];
        }
    }
    
    public void SetItem(int index, T item)
    {
        lock (_lock)
        {
            _list[index] = item;
        }
    }
}