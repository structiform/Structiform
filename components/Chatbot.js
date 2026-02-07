function Chatbot({ isOpen, onToggle }) {
  try {
    const [messages, setMessages] = React.useState([
      { role: 'bot', text: 'Hello! Welcome to STRUCTIFORM. How can I help you today?' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [selectedFilter, setSelectedFilter] = React.useState('all');

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
      await handleSend(action.text);
    };

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
      
      const response = await invokeAIAgent(systemPrompt, messageText);
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
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