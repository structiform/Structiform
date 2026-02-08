function Analytics() {
  try {
    const [aiRecommendations, setAiRecommendations] = React.useState([
      'Schedule more meetings during 10-11 AM for better engagement',
      'Consider reassigning tasks to balance workload across team',
      'User activity peaks on Tuesdays and Wednesdays'
    ]);

    return (
      <div data-name="analytics" data-file="components/admin/Analytics.js">
        <h1 className="text-3xl font-bold mb-6">Analytics & AI Insights</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-trending-up text-2xl text-blue-600"></div>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">Total Tasks</h3>
            <p className="text-3xl font-bold mb-2">156</p>
            <span className="text-sm text-green-600">↑ 12% this week</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-check-circle text-2xl text-green-600"></div>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">Completed</h3>
            <p className="text-3xl font-bold mb-2">89</p>
            <span className="text-sm text-green-600">57% completion</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-clock text-2xl text-orange-600"></div>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">Avg Response</h3>
            <p className="text-3xl font-bold mb-2">2.4h</p>
            <span className="text-sm text-orange-600">↓ 15 mins faster</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Activity Heatmap</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day}>
                <div className="text-xs text-center mb-2 font-medium">{day}</div>
                <div className="space-y-2">
                  {[...Array(6)].map((_, j) => {
                    const intensity = Math.floor(Math.random() * 4);
                    const colors = ['bg-gray-100', 'bg-green-200', 'bg-green-400', 'bg-green-600'];
                    return (
                      <div key={j} className={`h-8 rounded ${colors[intensity]}`}></div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="icon-brain text-xl text-purple-600"></div>
            </div>
            <h3 className="text-lg font-semibold">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((rec, i) => (
              <div key={i} className="bg-white rounded-lg p-4 flex items-start space-x-3">
                <div className="icon-lightbulb text-lg text-yellow-500 mt-1"></div>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Analytics error:', error);
    return null;
  }
}