function StaffSidebar({ activeTab, onTabChange }) {
  try {
    const [unreadCount] = React.useState(2);

    const menuItems = [
      { id: 'all-tasks', label: 'All Tasks', icon: 'list' },
      { id: 'my-tasks', label: 'My Assignments', icon: 'user-check' },
      { id: 'schedule', label: 'My Schedule', icon: 'calendar' },
      { id: 'notifications', label: 'Notifications', icon: 'bell', badge: unreadCount },
      { id: 'profile', label: 'My Profile', icon: 'user' },
      { id: 'settings', label: 'Settings', icon: 'settings' }
    ];

    return (
      <aside className="w-64 bg-white shadow-lg" data-name="staff-sidebar" data-file="components/staff/StaffSidebar.js">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Staff Dashboard</h2>
          <p className="text-sm text-gray-500">STRUCTIFORM</p>
        </div>
        
        <nav className="p-4">
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
              {item.badge && item.badge > 0 && (
                <span className="ml-auto w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
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
    console.error('StaffSidebar error:', error);
    return null;
  }
}