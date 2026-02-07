function BookingModal({ onClose }) {
  try {
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      product: '',
      otherProduct: ''
    });

    const products = [
      'Living Room Design',
      'Office Design',
      'Kitchen Renovation',
      'Bedroom Design',
      'Bathroom Renovation',
      'Full Home Renovation',
      'Other'
    ];

    const handlePhoneChange = (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value && !value.startsWith('254')) {
        value = '254' + value;
      }
      setFormData({...formData, phone: value});
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const booking = {
        ...formData,
        phone: '+' + formData.phone,
        createdAt: new Date().toISOString()
      };

      await trickleCreateObject('booking', booking);
      
      onClose();
      alert('Thank you for booking with STRUCTIFORM! We will contact you shortly via WhatsApp or call.');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Book a Service</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <div className="icon-x text-xl"></div>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone (+254...)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+254712345678"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Service</label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Choose a service</option>
                {products.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {formData.product === 'Other' && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Specify Service</label>
                <input
                  type="text"
                  value={formData.otherProduct}
                  onChange={(e) => setFormData({...formData, otherProduct: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            )}

            <button type="submit" className="w-full btn-primary">
              Submit Booking
            </button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BookingModal error:', error);
    return null;
  }
}