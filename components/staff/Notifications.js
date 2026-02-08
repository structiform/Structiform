function Notifications() {
  try {
    const [notifications, setNotifications] = React.useState([
      { id: 1, title: 'New Task Assigned', message: 'You have been assigned to "Living Room Design Review"', date: '2025-11-03', read: false },
      { id: 2, title: 'Deadline Reminder', message: 'Your task is due in 2 days', date: '2025-11-02', read: false },
      { id: 3, title: 'Schedule Update', message: 'Client meeting rescheduled to tomorrow 10 AM', date: '2025-11-01', read: true }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
      setNotifications(notifications.map(n => 
        n.id === id ? {...n, read: true} : n
      ));
    };

    const deleteNotification = (id) => {
      if (confirm('Delete this notification?')) {
        setNotifications(notifications.filter(n => n.id !== id));
      }
    };

    return (
      <div data-name="notifications" data-file="components/staff/Notifications.js">
        <div className="flex items-center space-x-3 mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`bg-white rounded-xl shadow-sm p-6 transition-all ${!notif.read ? 'border-l-4 border-[var(--primary-color)]' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg">{notif.title}</h3>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-sm text-gray-400">{notif.date}</p>
                </div>
                <button 
                  onClick={() => deleteNotification(notif.id)}
                  className="text-gray-400 hover:text-red-500 ml-4"
                >
                  <div className="icon-x text-lg"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Notifications error:', error);
    return null;
  }
}