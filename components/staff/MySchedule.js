function MySchedule() {
  try {
    const [schedule, setSchedule] = React.useState([
      { id: 1, title: 'Client Meeting', date: '2025-11-05', time: '10:00 AM', location: 'Office' },
      { id: 2, title: 'Site Visit', date: '2025-11-08', time: '2:00 PM', location: '123 Main St' },
      { id: 3, title: 'Team Review', date: '2025-11-12', time: '11:00 AM', location: 'Conference Room' }
    ]);

    return (
      <div data-name="my-schedule" data-file="components/staff/MySchedule.js">
        <h1 className="text-3xl font-bold mb-6">My Schedule</h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-4">
            {schedule.map(event => (
              <div key={event.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                  <div className="icon-calendar text-xl text-blue-600"></div>
                  <span className="text-xs text-blue-600 mt-1">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <div className="icon-clock text-base mr-1"></div>
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <div className="icon-map-pin text-base mr-1"></div>
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => alert(`Event: ${event.title}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}`)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Mark this schedule as completed and remove?')) {
                        setSchedule(schedule.filter(e => e.id !== event.id));
                        alert('Schedule completed and removed!');
                      }
                    }}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MySchedule error:', error);
    return null;
  }
}