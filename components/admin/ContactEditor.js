function ContactEditor() {
  try {
    const [contact, setContact] = React.useState({
      address: '',
      phone: '',
      email: '',
      whatsapp: '',
      instagram: '',
      tiktok: ''
    });

    React.useEffect(() => {
      loadContact();
    }, []);

    const loadContact = async () => {
      const result = await trickleListObjects('contact_info', 1, true);
      if (result.items.length > 0) {
        setContact(result.items[0].objectData);
      }
    };

    const handleSave = async () => {
      const result = await trickleListObjects('contact_info', 1, true);
      if (result.items.length > 0) {
        await trickleUpdateObject('contact_info', result.items[0].objectId, contact);
      } else {
        await trickleCreateObject('contact_info', contact);
      }
      alert('Contact information updated successfully!');
    };

    return (
      <div data-name="contact-editor" data-file="components/admin/ContactEditor.js">
        <h1 className="text-3xl font-bold mb-6">Edit Contact Information</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input type="text" value={contact.address} onChange={e => setContact({...contact, address: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone (+254...)</label>
              <input type="tel" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp Link</label>
              <input type="url" value={contact.whatsapp} onChange={e => setContact({...contact, whatsapp: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram URL</label>
              <input type="url" value={contact.instagram} onChange={e => setContact({...contact, instagram: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">TikTok URL</label>
              <input type="url" value={contact.tiktok} onChange={e => setContact({...contact, tiktok: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <button onClick={handleSave} className="w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ContactEditor error:', error);
    return null;
  }
}