function ProjectGallery() {
  try {
    const [activeFilter, setActiveFilter] = React.useState('All');
    
    const filters = ['All', 'Living Rooms', 'Offices', 'Renovations', 'Kitchens'];
    
    const projects = [
      { id: 1, title: 'Modern Living Space', category: 'Living Rooms', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
      { id: 2, title: 'Corporate Office', category: 'Offices', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
      { id: 3, title: 'Kitchen Renovation', category: 'Renovations', image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=600&q=80' },
      { id: 4, title: 'Luxury Living Room', category: 'Living Rooms', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80' },
      { id: 5, title: 'Modern Kitchen', category: 'Kitchens', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80' },
      { id: 6, title: 'Home Office', category: 'Offices', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80' }
    ];

    const filteredProjects = activeFilter === 'All' 
      ? projects 
      : projects.filter(p => p.category === activeFilter);

    return (
      <section className="py-16 bg-gray-50" data-name="gallery" data-file="components/ProjectGallery.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-8">Featured Projects</h3>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'bg-white text-[var(--secondary-color)] hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer">
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
                <div className="p-5">
                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <p className="text-[var(--secondary-color)]">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('ProjectGallery component error:', error);
    return null;
  }
}