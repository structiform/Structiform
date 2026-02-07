function Categories() {
  try {
    const categories = [
      { name: 'Living Rooms', icon: 'sofa', count: 24 },
      { name: 'Offices', icon: 'briefcase', count: 18 },
      { name: 'Renovations', icon: 'hammer', count: 32 },
      { name: 'Kitchens', icon: 'chef-hat', count: 15 }
    ];

    return (
      <section className="py-16 bg-white" data-name="categories" data-file="components/Categories.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Our Specialties</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <div className={`icon-${category.icon} text-2xl text-[var(--primary-color)]`}></div>
                </div>
                <h4 className="text-xl font-semibold mb-2">{category.name}</h4>
                <p className="text-[var(--secondary-color)]">{category.count} Projects</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Categories component error:', error);
    return null;
  }
}