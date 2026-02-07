function TaskModal({ task, onClose, onSave }) {
  try {
    const [form, setForm] = React.useState(task || {
      title: '', assignee: '', status: 'pending', dueDate: '', priority: 'Medium', category: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(form);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">{task?.id ? 'Edit' : 'Create'} Task</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Task Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3" required />
            <input type="text" placeholder="Assignee" value={form.assignee} onChange={e => setForm({...form, assignee: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3" required />
            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3">
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3" required />
            <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3" required />
            <div className="flex space-x-2">
              <button type="submit" className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">Save</button>
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TaskModal error:', error);
    return null;
  }
}