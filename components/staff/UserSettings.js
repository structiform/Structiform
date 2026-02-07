function UserSettings() {
  try {
    const [settings, setSettings] = React.useState({
      darkMode: false,
      notifications: true,
      emailAlerts: true,
      twoFactor: false
    });

    const handleDarkModeToggle = (checked) => {
      setSettings({...settings, darkMode: checked});
      if (checked) {
        document.body.classList.add('dark');
        document.body.style.backgroundColor = '#1a202c';
        document.body.style.color = '#f7fafc';
      } else {
        document.body.classList.remove('dark');
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#1a202c';
      }
    };

    const handleChangePassword = () => {
      const currentPassword = prompt('Enter current password:');
      if (currentPassword) {
        const newPassword = prompt('Enter new password:');
        if (newPassword) {
          const confirmPassword = prompt('Confirm new password:');
          if (newPassword === confirmPassword) {
            alert('Password change request sent to admin for approval!');
          } else {
            alert('Passwords do not match!');
          }
        }
      }
    };

    const handleClearCache = () => {
      if (confirm('Clear all cached data?')) {
        localStorage.clear();
        alert('Cache cleared successfully!');
      }
    };

    const handleDownloadData = () => {
      const data = {
        profile: 'User profile data',
        tasks: 'User tasks data',
        settings: settings
      };
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `my_data_${new Date().toISOString()}.json`;
      link.click();
      alert('Your data has been downloaded!');
    };

    return (
      <div data-name="user-settings" data-file="components/staff/UserSettings.js">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Toggle dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.darkMode} 
                  onChange={(e) => handleDarkModeToggle(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive in-app alerts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications} 
                    onChange={(e) => setSettings({...settings, notifications: e.target.checked})} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Alerts</p>
                  <p className="text-sm text-gray-500">Receive email notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.emailAlerts} 
                    onChange={(e) => setSettings({...settings, emailAlerts: e.target.checked})} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add extra security layer</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.twoFactor} 
                    onChange={(e) => {
                      setSettings({...settings, twoFactor: e.target.checked});
                      if (e.target.checked) {
                        alert('2FA enabled! You will receive a code via email.');
                      }
                    }} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                </label>
              </div>
              <button 
                onClick={handleChangePassword}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
              >
                Change Password
              </button>
              <button 
                onClick={() => alert('Login history loaded')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
              >
                View Login History
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
            <div className="space-y-2">
              <button 
                onClick={handleClearCache}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
              >
                Clear Cache
              </button>
              <button 
                onClick={handleDownloadData}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
              >
                Download My Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UserSettings error:', error);
    return null;
  }
}