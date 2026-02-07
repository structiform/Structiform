function NotificationCenter() {
  try {
    const [notifications, setNotifications] = React.useState([
      { id: 1, title: 'System Maintenance', message: 'Scheduled for Sunday 2 AM', type: 'info', viewed: false },
      { id: 2, title: 'Security Alert', message: '3 failed login attempts detected', type: 'warning', viewed: false }
    ]);
    const [showCreateModal, setShowCreateModal] = React.useState(false);
    const [newAlert, setNewAlert] = React.useState({ title: '', message: '', type: 'info', freeze: false });

    const unviewedCount = notifications.filter(n => !n.viewed).length;

    const handleView = (id) => {
      setNotifications(notifications.map(n => n.id === id ? {...n, viewed: true} : n));
    };

    const handleDelete = (id) => {
      if (confirm('Delete this notification?')) {
        setNotifications(notifications.filter(n => n.id !== id));
      }
    };

    const handleCreate = () => {
      const alert = {...newAlert, id: Date.now(), viewed: false};
      setNotifications([alert, ...notifications]);
      
      if (alert.freeze) {
        document.body.style.pointerEvents = 'none';
        document.getElementById('notification-overlay').style.pointerEvents = 'auto';
        setTimeout(() => {
          document.body.style.pointerEvents = 'auto';
        }, 5000);
      }
      
      setShowCreateModal(false);
      setNewAlert({ title: '', message: '', type: 'info', freeze: false });
    };

    return (
      <div data-name="notification-center" data-file="components/admin/NotificationCenter.js">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold">Notification Center</h1>
            {unviewedCount > 0 && (
              <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {unviewedCount}
              </span>
            )}
          </div>
          <button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
            <div className="icon-plus text-lg"></div>
            <span>Create Alert</span>
          </button>
        </div>

        <div id="notification-overlay" className="grid gap-4">
          {notifications.map(notif => (
            <div key={notif.id} className={`bg-white rounded-xl shadow-sm p-6 ${!notif.viewed ? 'border-2 border-[var(--primary-color)]' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1" onClick={() => handleView(notif.id)}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    notif.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <div className={`icon-${notif.type === 'warning' ? 'alert-triangle' : 'info'} text-xl ${
                      notif.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{notif.title}</h3>
                    <p className="text-gray-600">{notif.message}</p>
                    {!notif.viewed && <span className="text-xs text-[var(--primary-color)] font-medium mt-2 inline-block">● New</span>}
                  </div>
                </div>
                <button onClick={() => handleDelete(notif.id)} className="text-gray-400 hover:text-gray-600 ml-4">
                  <div className="icon-x text-lg"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Create Alert</h3>
              <input type="text" placeholder="Alert Title" value={newAlert.title} onChange={e => setNewAlert({...newAlert, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3" />
              <textarea placeholder="Alert Message" value={newAlert.message} onChange={e => setNewAlert({...newAlert, message: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3 h-24" />
              <select value={newAlert.type} onChange={e => setNewAlert({...newAlert, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3">
                <option value="info">Info</option>
                <option value="warning">Warning</option>
              </select>
              <label className="flex items-center space-x-2 mb-4">
                <input type="checkbox" checked={newAlert.freeze} onChange={e => setNewAlert({...newAlert, freeze: e.target.checked})} />
                <span className="text-sm">Freeze website (admin only access)</span>
              </label>
              <div className="flex space-x-2">
                <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">Create</button>
                <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('NotificationCenter error:', error);
    return null;
  }
}