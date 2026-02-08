function MyTasks() {
  try {
    const [myTasks, setMyTasks] = React.useState([
      { id: 1, title: 'Living Room Design Review', status: 'pending', dueDate: '2025-11-10', priority: 'High' },
      { id: 2, title: 'Client Presentation Prep', status: 'in-progress', dueDate: '2025-11-08', priority: 'Medium' }
    ]);

    return (
      <div data-name="my-tasks" data-file="components/staff/MyTasks.js">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Assignments</h1>
          <div className="text-sm text-gray-500">
            {myTasks.filter(t => t.status !== 'completed').length} pending tasks
          </div>
        </div>

        <div className="grid gap-4">
          {myTasks.map(task => (
            <div key={task.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <div className="icon-calendar text-base mr-1"></div>
                      Due: {task.dueDate}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'High' ? 'bg-red-100 text-red-800' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.status}
                </span>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    const update = prompt('Enter your update for this task:');
                    if (update) {
                      alert('Update submitted successfully!');
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--accent-color)] transition-all"
                >
                  Submit Update
                </button>
                <button 
                  onClick={() => alert(`Task: ${task.title}\nStatus: ${task.status}\nPriority: ${task.priority}\nDue: ${task.dueDate}`)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('MyTasks error:', error);
    return null;
  }
}