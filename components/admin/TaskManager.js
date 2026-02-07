function TaskManager() {
  try {
    const [tasks, setTasks] = React.useState([
      { id: 1, title: 'Living Room Design Review', assignee: 'John Doe', status: 'pending', dueDate: '2025-11-10', priority: 'High', category: 'Design' },
      { id: 2, title: 'Office Space Planning', assignee: 'Jane Smith', status: 'in-progress', dueDate: '2025-11-15', priority: 'Medium', category: 'Planning' }
    ]);
    
    const [showCreateModal, setShowCreateModal] = React.useState(false);
    const [editTask, setEditTask] = React.useState(null);
    const [filter, setFilter] = React.useState('all');
    const [search, setSearch] = React.useState('');

    const handleEdit = (task) => {
      setEditTask({...task});
      setShowCreateModal(true);
    };

    const handleDelete = (id) => {
      if (confirm('Delete this task?')) {
        setTasks(tasks.filter(t => t.id !== id));
      }
    };

    const handleSave = (taskData) => {
      if (taskData.id) {
        setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
      } else {
        setTasks([...tasks, {...taskData, id: Date.now()}]);
      }
      setShowCreateModal(false);
      setEditTask(null);
    };

    const openCreate = () => {
      setEditTask({id: null, title: '', assignee: '', status: 'pending', dueDate: '', priority: 'Medium', category: ''});
      setShowCreateModal(true);
    };

    const stats = {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };

    const filtered = tasks.filter(t => {
      const matchFilter = filter === 'all' || t.status === filter;
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });

    return (
      <div data-name="task-manager" data-file="components/admin/TaskManager.js">
        <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Tasks</span>
              <div className="icon-list text-xl text-blue-600"></div>
            </div>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Pending</span>
              <div className="icon-clock text-xl text-yellow-600"></div>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">In Progress</span>
              <div className="icon-loader text-xl text-blue-600"></div>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Completed</span>
              <div className="icon-check-circle text-xl text-green-600"></div>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
            <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button 
            onClick={openCreate}
            className="flex items-center space-x-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg"
          >
            <div className="icon-plus text-lg"></div>
            <span>Create Task</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Task</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Assignee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Due Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(task => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">{task.assignee}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'High' ? 'bg-red-100 text-red-800' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{task.dueDate}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleEdit(task)} className="text-[var(--primary-color)] hover:underline mr-3">Edit</button>
                    <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showCreateModal && (
          <TaskModal
            task={editTask}
            onClose={() => {
              setShowCreateModal(false);
              setEditTask(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('TaskManager error:', error);
    return null;
  }
}
