function ContactPage() {
  try {
    const [contact, setContact] = React.useState(null);

    React.useEffect(() => {
      loadContact();
    }, []);

    const loadContact = async () => {
      const result = await trickleListObjects('contact_info', 1, true);
      if (result.items.length > 0) {
        setContact(result.items[0].objectData);
      }
    };

    const handlePhoneClick = (phone) => {
      const cleanPhone = phone.replace(/\D/g, '');
      window.open(`https://wa.me/${cleanPhone}`, '_blank');
    };

    if (!contact) return <div>Loading...</div>;

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <a href="index.html" className="text-[var(--primary-color)]">Back to Home</a>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="icon-map-pin text-xl text-blue-600"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">{contact.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="icon-phone text-xl text-green-600"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <button 
                    onClick={() => handlePhoneClick(contact.phone)}
                    className="text-[var(--primary-color)] hover:underline"
                  >
                    {contact.phone}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="icon-mail text-xl text-purple-600"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href={`mailto:${contact.email}`} className="text-[var(--primary-color)] hover:underline">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {contact.whatsapp && (
                    <a href={contact.whatsapp} target="_blank" className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <div className="icon-message-circle text-xl text-green-600"></div>
                    </a>
                  )}
                  {contact.instagram && (
                    <a href={contact.instagram} target="_blank" className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <div className="icon-instagram text-xl text-pink-600"></div>
                    </a>
                  )}
                  {contact.tiktok && (
                    <a href={contact.tiktok} target="_blank" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="icon-music text-xl text-gray-600"></div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('ContactPage error:', error);
    return null;
  }
}