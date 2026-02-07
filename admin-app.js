function AdminApp() {
  try {
    const [activeTab, setActiveTab] = React.useState('performance');

    const renderContent = () => {
      switch(activeTab) {
        case 'tasks':
          return <TaskManager />;
        case 'schedule':
          return <ScheduleManager />;
        case 'users':
          return <UserManagement />;
        case 'backup':
          return <BackupCenter />;
        case 'logs':
          return <ActivityLogs />;
        case 'performance':
          return <PerformanceDashboard />;
        case 'analytics':
          return <Analytics />;
        case 'notifications':
          return <NotificationCenter />;
        case 'bookings':
          return <BookingManager />;
        case 'projects':
          return <ProjectManager />;
        case 'contact':
          return <ContactEditor />;
        case 'email':
          return <EmailDashboard />;
        case 'settings':
          return <ThemeSettings />;
        default:
          return <PerformanceDashboard />;
      }
    };

    return (
      <div className="flex min-h-screen bg-gray-50" data-name="admin-app" data-file="admin-app.js">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    );
  } catch (error) {
    console.error('AdminApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminApp />);