function AdminSidebar({ activeTab, onTabChange }) {
  try {
    const menuItems = [
      { id: 'performance', label: 'Performance', icon: 'gauge' },
      { id: 'analytics', label: 'Analytics & AI', icon: 'brain' },
      { id: 'email', label: 'Email Dashboard', icon: 'mail' },
      { id: 'bookings', label: 'Bookings', icon: 'calendar-check' },
      { id: 'projects', label: 'Projects', icon: 'folder' },
      { id: 'contact', label: 'Contact Info', icon: 'phone' },
      { id: 'tasks', label: 'Task Manager', icon: 'list-checks' },
      { id: 'schedule', label: 'Schedule', icon: 'calendar' },
      { id: 'users', label: 'Users', icon: 'users' },
      { id: 'logs', label: 'Activity Logs', icon: 'file-text' },
      { id: 'notifications', label: 'Notifications', icon: 'bell' },
      { id: 'backup', label: 'Backup Center', icon: 'database' },
      { id: 'settings', label: 'Theme Settings', icon: 'palette' }
    ];

    return (
      <aside className="w-64 bg-white shadow-lg flex flex-col h-screen sticky top-0" data-name="admin-sidebar" data-file="components/admin/AdminSidebar.js">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">STRUCTIFORM</p>
        </div>
        
        <nav className="p-4 flex-1 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeTab === item.id 
                  ? 'bg-[var(--primary-color)] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className={`icon-${item.icon} text-xl`}></div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t mt-auto">
          <button 
            onClick={() => window.location.href = 'index.html'}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <div className="icon-log-out text-xl"></div>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    );
  } catch (error) {
    console.error('AdminSidebar error:', error);
    return null;
  }
}