function ProjectManager() {
  try {
    const [projects, setProjects] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [form, setForm] = React.useState({title: '', description: '', category: '', image: ''});

    React.useEffect(() => {
      loadProjects();
    }, []);

    const loadProjects = async () => {
      const result = await trickleListObjects('project', 50, true);
      setProjects(result.items);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await trickleCreateObject('project', form);
      setForm({title: '', description: '', category: '', image: ''});
      setShowModal(false);
      loadProjects();
    };

    const handleDelete = async (id) => {
      if (confirm('Delete this project?')) {
        await trickleDeleteObject('project', id);
        loadProjects();
      }
    };

    return (
      <div data-name="project-manager" data-file="components/admin/ProjectManager.js">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.objectId} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={project.objectData.image} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{project.objectData.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{project.objectData.description}</p>
                <button onClick={() => handleDelete(project.objectId)} className="text-red-500 text-sm hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add New Project</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3" required />
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3" required />
                <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg mb-3" required />
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <input type="file" accept="image/*" onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setForm({...form, image: reader.result});
                      reader.readAsDataURL(file);
                    }
                  }} className="w-full px-4 py-2 border rounded-lg" required />
                  {form.image && <img src={form.image} className="mt-2 h-20 rounded" />}
                </div>
                <div className="flex space-x-2">
                  <button type="submit" className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">Save</button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('ProjectManager error:', error);
    return null;
  }
}