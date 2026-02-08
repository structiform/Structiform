function Hero({ onBookingClick }) {
  try {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20" data-name="hero" data-file="components/Hero.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-[var(--text-dark)] mb-6">
                Transform Your Space with Expert Design
              </h2>
              <p className="text-lg text-[var(--secondary-color)] mb-8">
                Professional interior design and consultancy services that bring your vision to life. From living rooms to offices, we create spaces that inspire.
              </p>
              <div className="flex space-x-4">
                <button onClick={onBookingClick} className="btn-primary">Book Now</button>
                <a href="projects.html" className="btn-secondary">View Projects</a>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[var(--primary-color)] bg-opacity-10 rounded-2xl p-8">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" 
                  alt="Modern interior design" 
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}