function Header({ onLoginClick, onBookingClick }) {
  try {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="https://app.trickle.so/storage/public/images/usr_1748ba3760008001/34b56a21-5d4a-417c-b8ed-9ec53860268c.jpeg" alt="STRUCTIFORM Logo" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h1 className="text-xl font-bold text-[var(--text-dark)]">STRUCTIFORM</h1>
                <p className="text-sm text-[var(--secondary-color)]">Interior Design & Consultancy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <a href="projects.html" className="px-4 py-2 text-gray-700 hover:text-[var(--primary-color)] transition-all">Projects</a>
              <a href="contact.html" className="px-4 py-2 text-gray-700 hover:text-[var(--primary-color)] transition-all">Contact</a>
              <button 
                onClick={onBookingClick}
                className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--accent-color)] transition-all"
              >
                Book Service
              </button>
              <button 
                onClick={onLoginClick}
                className="flex items-center space-x-2 px-4 py-2 bg-[var(--secondary-color)] text-white rounded-lg hover:bg-gray-700 transition-all"
              >
                <div className="icon-settings text-lg"></div>
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}