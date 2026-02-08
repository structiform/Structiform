function ScheduleManager() {
  try {
    const [events, setEvents] = React.useState([
      { id: 1, title: 'Client Meeting - Living Room Project', date: '2025-11-05', time: '10:00 AM' },
      { id: 2, title: 'Site Visit - Office Renovation', date: '2025-11-08', time: '2:00 PM' },
      { id: 3, title: 'Design Presentation', date: '2025-11-12', time: '11:00 AM' }
    ]);
    const [showModal, setShowModal] = React.useState(false);
    const [editEvent, setEditEvent] = React.useState(null);

    const handleDelete = (id) => {
      if (confirm('Delete this event?')) {
        setEvents(events.filter(e => e.id !== id));
      }
    };

    const handleEdit = (event) => {
      setEditEvent({...event});
      setShowModal(true);
    };

    const handleAdd = () => {
      setEditEvent({ id: null, title: '', date: '', time: '' });
      setShowModal(true);
    };

    const handleSave = () => {
      if (editEvent.id) {
        setEvents(events.map(e => e.id === editEvent.id ? editEvent : e));
      } else {
        setEvents([...events, {...editEvent, id: Date.now()}]);
      }
      setShowModal(false);
      setEditEvent(null);
    };

    return (
      <div data-name="schedule-manager" data-file="components/admin/ScheduleManager.js">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="icon-compass text-2xl text-[var(--primary-color)]"></div>
            <h1 className="text-3xl font-bold">Schedule Manager</h1>
          </div>
          <button onClick={handleAdd} className="flex items-center space-x-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
            <div className="icon-plus text-lg"></div>
            <span>Add Event</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="icon-calendar text-xl text-blue-600"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(event)} className="px-3 py-1 text-sm text-[var(--primary-color)] hover:bg-gray-100 rounded">Edit</button>
                  <button onClick={() => handleDelete(event.id)} className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && editEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{editEvent.id ? 'Edit' : 'Add'} Event</h3>
              <div className="space-y-4">
                <input placeholder="Event Title" value={editEvent.title} onChange={e => setEditEvent({...editEvent, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <input type="date" value={editEvent.date} onChange={e => setEditEvent({...editEvent, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                <input type="time" value={editEvent.time} onChange={e => setEditEvent({...editEvent, time: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div className="flex space-x-2 mt-4">
                <button onClick={handleSave} className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">Save</button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('ScheduleManager error:', error);
    return null;
  }
}