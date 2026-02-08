function LoginModal({ onClose }) {
  try {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      
      // Demo credentials - replace with actual authentication
      if (email === 'admin@structiform.com' && password === 'admin123') {
        window.location.href = 'admin-dashboard.html';
      } else if (email === 'staff@structiform.com' && password === 'staff123') {
        window.location.href = 'staff-dashboard.html';
      } else {
        setError('Invalid credentials. Please try again.');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="login-modal" data-file="components/LoginModal.js">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Staff Login</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <div className="icon-x text-xl"></div>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>Demo credentials:</p>
            <p>Admin: admin@structiform.com / admin123</p>
            <p>Staff: staff@structiform.com / staff123</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginModal component error:', error);
    return null;
  }
}