function EmailDashboard() {
  try {
    const [emailData, setEmailData] = React.useState({
      to: '',
      subject: '',
      message: ''
    });
    const [sent, setSent] = React.useState([]);

    const handleSend = async (e) => {
      e.preventDefault();
      const newEmail = {
        ...emailData,
        sentAt: new Date().toISOString()
      };
      await trickleCreateObject('email', newEmail);
      setSent([newEmail, ...sent]);
      setEmailData({to: '', subject: '', message: ''});
      alert('Email sent successfully!');
    };

    React.useEffect(() => {
      loadSent();
    }, []);

    const loadSent = async () => {
      const result = await trickleListObjects('email', 50, true);
      setSent(result.items);
    };

    return (
      <div data-name="email-dashboard" data-file="components/admin/EmailDashboard.js">
        <h1 className="text-3xl font-bold mb-6">Email Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Compose Email</h3>
            <form onSubmit={handleSend}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">To</label>
                <input
                  type="email"
                  value={emailData.to}
                  onChange={e => setEmailData({...emailData, to: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={e => setEmailData({...emailData, subject: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={emailData.message}
                  onChange={e => setEmailData({...emailData, message: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg h-32"
                  required
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
                Send Email
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Sent Emails</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sent.map((email, i) => (
                <div key={i} className="border-b pb-3">
                  <p className="font-medium">{email.objectData?.to || email.to}</p>
                  <p className="text-sm text-gray-600">{email.objectData?.subject || email.subject}</p>
                  <p className="text-xs text-gray-400">{new Date(email.objectData?.sentAt || email.sentAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('EmailDashboard error:', error);
    return null;
  }
}