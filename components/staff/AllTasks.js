function AllTasks() {
  try {
    const [tasks, setTasks] = React.useState([
      { id: 1, title: 'Living Room Design Review', assignee: 'John Doe', status: 'pending', dueDate: '2025-11-10', category: 'Design' },
      { id: 2, title: 'Office Space Planning', assignee: 'Jane Smith', status: 'in-progress', dueDate: '2025-11-15', category: 'Planning' },
      { id: 3, title: 'Kitchen Renovation Consultation', assignee: 'Mike Johnson', status: 'completed', dueDate: '2025-11-05', category: 'Consultation' }
    ]);

    return (
      <div data-name="all-tasks" data-file="components/staff/AllTasks.js">
        <h1 className="text-3xl font-bold mb-6">All Platform Tasks</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Task</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Assignee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{task.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{task.assignee}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AllTasks error:', error);
    return null;
  }
}