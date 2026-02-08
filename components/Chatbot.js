function Chatbot({ isOpen, onToggle }) {
  try {
    const [messages, setMessages] = React.useState([
      { role: 'bot', text: 'Hello! Welcome to STRUCTIFORM. How can I help you today?' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [selectedFilter, setSelectedFilter] = React.useState('all');
    const [showBookingForm, setShowBookingForm] = React.useState(false);
    const [showContactInfo, setShowContactInfo] = React.useState(false);
    const [contactData, setContactData] = React.useState(null);
    const [bookingForm, setBookingForm] = React.useState({
      firstName: '', lastName: '', email: '', phone: '', product: '', otherProduct: ''
    });

    React.useEffect(() => {
      loadContact();
    }, []);

    const loadContact = async () => {
      const result = await trickleListObjects('contact_info', 1, true);
      if (result.items.length > 0) {
        setContactData(result.items[0].objectData);
      }
    };

    const filters = [
      { id: 'all', label: 'All', icon: 'message-circle' },
      { id: 'services', label: 'Services', icon: 'briefcase' },
      { id: 'booking', label: 'Book', icon: 'calendar-check' },
      { id: 'contact', label: 'Contact', icon: 'phone' }
    ];

    const quickActions = [
      { text: 'View services', intent: 'services' },
      { text: 'Book now', intent: 'booking' },
      { text: 'Contact info', intent: 'contact' }
    ];

    const handleQuickAction = async (action) => {
      setSelectedFilter(action.intent);
      if (action.intent === 'booking') {
        setShowBookingForm(true);
      } else if (action.intent === 'contact') {
        setShowContactInfo(true);
      } else {
        await handleSend(action.text);
      }
    };

    const handlePhoneChange = (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value && !value.startsWith('254')) {
        value = '254' + value;
      }
      setBookingForm({...bookingForm, phone: value});
    };

    const handleBookingSubmit = async (e) => {
      e.preventDefault();
      const booking = {
        ...bookingForm,
        phone: '+' + bookingForm.phone,
        createdAt: new Date().toISOString()
      };
      await trickleCreateObject('booking', booking);
      setShowBookingForm(false);
      setBookingForm({ firstName: '', lastName: '', email: '', phone: '', product: '', otherProduct: '' });
      setMessages([...messages, 
        { role: 'user', text: 'I want to book a service' },
        { role: 'bot', text: 'Thank you for booking! We will contact you shortly via WhatsApp or call.' }
      ]);
    };

    const products = [
      'Living Room Design', 'Office Design', 'Kitchen Renovation',
      'Bedroom Design', 'Bathroom Renovation', 'Full Home Renovation', 'Other'
    ];

    const handleSend = async (customText = null) => {
      const messageText = customText || input;
      if (!messageText.trim()) return;

      const userMsg = { role: 'user', text: messageText };
      setMessages([...messages, userMsg]);
      setInput('');
      setIsTyping(true);

      const systemPrompt = `You are STRUCTIFORM's chatbot. Answer in 2-3 sentences max, be brief and helpful.

Services: Living Room, Office, Kitchen, Bedroom, Bathroom, Full Home Renovation.

Intent: ${selectedFilter}

Rules:
- Keep responses SHORT (max 50 words)
- Be direct and actionable
- For services: list only relevant ones
- For booking: say "Click Book Service button above"
- For contact: provide basic info only`;
      
      // Show typing for 1 second minimum
      const startTime = Date.now();
      const response = await invokeAIAgent(systemPrompt, messageText);
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(1000 - elapsed, 0);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'bot', text: response }]);
      }, remainingTime);
    };

    if (!isOpen) {
      return (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[var(--primary-color)] text-white rounded-full shadow-lg hover:bg-[var(--accent-color)] transition-all z-50"
        >
          <div className="icon-message-circle text-2xl"></div>
        </button>
      );
    }

    return (
      <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
        <div className="bg-[var(--primary-color)] text-white p-4 rounded-t-2xl flex justify-between items-center">
          <h4 className="font-semibold">Chat with Us</h4>
          <button onClick={onToggle} className="text-white">
            <div className="icon-x text-xl"></div>
          </button>
        </div>

        <div className="flex space-x-2 p-3 border-b bg-gray-50 overflow-x-auto">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter.id
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className={`icon-${filter.icon} text-sm`}></div>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {showBookingForm ? (
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Book a Service</h4>
                <button onClick={() => setShowBookingForm(false)} className="text-gray-500">
                  <div className="icon-x text-lg"></div>
                </button>
              </div>
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="First Name" value={bookingForm.firstName} onChange={e => setBookingForm({...bookingForm, firstName: e.target.value})} className="px-3 py-2 border rounded text-sm" required />
                  <input type="text" placeholder="Last Name" value={bookingForm.lastName} onChange={e => setBookingForm({...bookingForm, lastName: e.target.value})} className="px-3 py-2 border rounded text-sm" required />
                </div>
                <input type="email" placeholder="Email" value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} className="w-full px-3 py-2 border rounded text-sm" required />
                <input type="tel" placeholder="Phone +254..." value={bookingForm.phone} onChange={handlePhoneChange} className="w-full px-3 py-2 border rounded text-sm" required />
                <select value={bookingForm.product} onChange={e => setBookingForm({...bookingForm, product: e.target.value})} className="w-full px-3 py-2 border rounded text-sm" required>
                  <option value="">Choose a service</option>
                  {products.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {bookingForm.product === 'Other' && (
                  <input type="text" placeholder="Specify Service" value={bookingForm.otherProduct} onChange={e => setBookingForm({...bookingForm, otherProduct: e.target.value})} className="w-full px-3 py-2 border rounded text-sm" required />
                )}
                <button type="submit" className="w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded text-sm">Submit Booking</button>
              </form>
            </div>
          ) : showContactInfo && contactData ? (
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Contact Information</h4>
                <button onClick={() => setShowContactInfo(false)} className="text-gray-500">
                  <div className="icon-x text-lg"></div>
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="icon-map-pin text-base text-blue-600 mt-1"></div>
                  <div><p className="text-gray-500 text-xs">Address</p><p>{contactData.address}</p></div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="icon-phone text-base text-green-600 mt-1"></div>
                  <div><p className="text-gray-500 text-xs">Phone</p><a href={`https://wa.me/${contactData.phone.replace(/\D/g, '')}`} target="_blank" className="text-[var(--primary-color)] hover:underline">{contactData.phone}</a></div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="icon-mail text-base text-purple-600 mt-1"></div>
                  <div><p className="text-gray-500 text-xs">Email</p><a href={`mailto:${contactData.email}`} className="text-[var(--primary-color)] hover:underline">{contactData.email}</a></div>
                </div>
                <div className="border-t pt-3 mt-3">
                  <p className="text-xs text-gray-500 mb-2">Follow Us</p>
                  <div className="flex space-x-2">
                    {contactData.whatsapp && <a href={contactData.whatsapp} target="_blank" className="w-8 h-8 bg-green-100 rounded flex items-center justify-center"><div className="icon-message-circle text-base text-green-600"></div></a>}
                    {contactData.instagram && <a href={contactData.instagram} target="_blank" className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center"><div className="icon-instagram text-base text-pink-600"></div></a>}
                    {contactData.tiktok && <a href={contactData.tiktok} target="_blank" className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center"><div className="icon-music text-base text-gray-600"></div></a>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-[var(--primary-color)] text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              {messages.length === 1 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickAction(action)}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs hover:bg-gray-50 transition-all"
                    >
                      {action.text}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg text-sm"
            />
            <button onClick={() => handleSend()} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
              <div className="icon-send text-lg"></div>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Chatbot error:', error);
    return null;
  }
}