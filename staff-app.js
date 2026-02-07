function StaffApp() {
  try {
    const [activeTab, setActiveTab] = React.useState('all-tasks');

    const renderContent = () => {
      switch(activeTab) {
        case 'all-tasks':
          return <AllTasks />;
        case 'my-tasks':
          return <MyTasks />;
        case 'schedule':
          return <MySchedule />;
        case 'notifications':
          return <Notifications />;
        case 'profile':
          return <UserProfile />;
        case 'settings':
          return <UserSettings />;
        default:
          return <AllTasks />;
      }
    };

    return (
      <div className="flex min-h-screen bg-gray-50" data-name="staff-app" data-file="staff-app.js">
        <StaffSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    );
  } catch (error) {
    console.error('StaffApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StaffApp />);