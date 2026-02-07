function ThemeSettings() {
  try {
    const [theme, setTheme] = React.useState('system');
    const [primaryColor, setPrimaryColor] = React.useState('#ff6b35');

    React.useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'system';
      const savedColor = localStorage.getItem('primaryColor') || '#ff6b35';
      setTheme(savedTheme);
      setPrimaryColor(savedColor);
      applyThemeSettings(savedTheme, savedColor);
    }, []);

    const applyThemeSettings = (themeMode, color) => {
      document.documentElement.style.setProperty('--primary-color', color);
      if (themeMode === 'dark') {
        document.body.classList.add('dark');
        document.body.style.backgroundColor = '#1a202c';
        document.body.style.color = '#f7fafc';
      } else if (themeMode === 'light') {
        document.body.classList.remove('dark');
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#1a202c';
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('dark', isDark);
        document.body.style.backgroundColor = isDark ? '#1a202c' : '#ffffff';
        document.body.style.color = isDark ? '#f7fafc' : '#1a202c';
      }
    };

    const applyTheme = () => {
      localStorage.setItem('theme', theme);
      localStorage.setItem('primaryColor', primaryColor);
      applyThemeSettings(theme, primaryColor);
      alert('Theme settings applied and saved!');
    };

    return (
      <div data-name="theme-settings" data-file="components/admin/ThemeSettings.js">
        <h1 className="text-3xl font-bold mb-6">Theme Settings</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Theme Mode</label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="system">System Default</option>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <div className="flex space-x-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 border rounded"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <button
              onClick={applyTheme}
              className="w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg"
            >
              Apply Theme
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ThemeSettings error:', error);
    return null;
  }
}