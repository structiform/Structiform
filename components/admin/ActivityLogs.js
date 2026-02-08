function ActivityLogs() {
  try {
    const [logs, setLogs] = React.useState([
      { id: 1, user: 'John Doe', action: 'Logged in', time: '2025-11-03 10:30 AM', type: 'auth' },
      { id: 2, user: 'Admin', action: 'Created new task', time: '2025-11-03 09:15 AM', type: 'task' },
      { id: 3, user: 'Jane Smith', action: 'Updated profile', time: '2025-11-03 08:45 AM', type: 'edit' },
      { id: 4, user: 'System', action: 'Backup completed', time: '2025-11-03 02:00 AM', type: 'system' }
    ]);

    const [filter, setFilter] = React.useState('all');
    const [selectedType, setSelectedType] = React.useState(null);

    const handleDelete = (id) => {
      if (confirm('Delete this log entry?')) {
        setLogs(logs.filter(l => l.id !== id));
      }
    };

    const handleExport = () => {
      const dataStr = JSON.stringify(filteredLogs, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `activity_logs_${new Date().toISOString()}.json`;
      link.click();
    };

    const filteredLogs = logs.filter(l => {
      const matchFilter = filter === 'all' || l.type === filter;
      const matchSelected = !selectedType || l.type === selectedType;
      return matchFilter && matchSelected;
    });

    return (
      <div data-name="activity-logs" data-file="components/admin/ActivityLogs.js">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Activity Logs</h1>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border rounded-lg" value={filter} onChange={(e) => {setFilter(e.target.value); setSelectedType(null);}}>
              <option value="all">All Activities</option>
              <option value="auth">Authentication</option>
              <option value="task">Tasks</option>
              <option value="system">System</option>
              <option value="edit">Edits</option>
            </select>
            <button onClick={handleExport} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
              Export Logs
            </button>
          </div>
        </div>

        {selectedType && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center">
            <span>Filtered by: <strong>{selectedType}</strong></span>
            <button onClick={() => setSelectedType(null)} className="text-blue-600 hover:underline">Clear Filter</button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{log.user}</td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{log.time}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => setSelectedType(log.type)} className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                      log.type === 'auth' ? 'bg-blue-100 text-blue-800' :
                      log.type === 'task' ? 'bg-green-100 text-green-800' :
                      log.type === 'edit' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.type}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(log.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ActivityLogs error:', error);
    return null;
  }
}