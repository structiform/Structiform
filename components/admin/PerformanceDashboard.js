function PerformanceDashboard() {
  try {
    const [metrics, setMetrics] = React.useState({
      uptime: '99.8%',
      activeUsers: 24,
      dataUsage: '2.4 GB',
      loadTime: '1.2s',
      failedLogins: 3
    });

    return (
      <div data-name="performance-dashboard" data-file="components/admin/PerformanceDashboard.js">
        <h1 className="text-3xl font-bold mb-6">Performance Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="icon-activity text-2xl text-green-600"></div>
              </div>
              <span className="text-sm text-green-600 font-medium">Healthy</span>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">System Uptime</h3>
            <p className="text-2xl font-bold">{metrics.uptime}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-users text-2xl text-blue-600"></div>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">Active Users</h3>
            <p className="text-2xl font-bold">{metrics.activeUsers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-hard-drive text-2xl text-purple-600"></div>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">Data Usage</h3>
            <p className="text-2xl font-bold">{metrics.dataUsage}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-zap text-2xl text-orange-600"></div>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">Avg Load Time</h3>
            <p className="text-2xl font-bold">{metrics.loadTime}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Security Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="icon-alert-triangle text-xl text-red-600"></div>
                  <span className="font-medium">Failed Login Attempts</span>
                </div>
                <span className="text-lg font-bold text-red-600">{metrics.failedLogins}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left">
                Clear Cache
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left">
                Optimize Database
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PerformanceDashboard error:', error);
    return null;
  }
}