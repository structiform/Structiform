function ProjectsPage() {
  try {
    const [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
      loadProjects();
    }, []);

    const loadProjects = async () => {
      const result = await trickleListObjects('project', 50, true);
      setProjects(result.items);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Our Projects</h1>
            <a href="index.html" className="text-[var(--primary-color)]">Back to Home</a>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.objectId} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img src={project.objectData.image} alt={project.objectData.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{project.objectData.title}</h3>
                  <p className="text-gray-600 mb-3">{project.objectData.description}</p>
                  <span className="text-sm text-[var(--primary-color)]">{project.objectData.category}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('ProjectsPage error:', error);
    return null;
  }
}