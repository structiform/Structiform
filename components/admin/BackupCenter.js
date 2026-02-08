function BackupCenter() {
  try {
    const [backups, setBackups] = React.useState([
      { id: 1, name: 'Auto Backup - Daily', date: '2025-11-03', size: '24.5 MB', type: 'Automatic' },
      { id: 2, name: 'Manual Backup', date: '2025-11-01', size: '23.8 MB', type: 'Manual' },
      { id: 3, name: 'Auto Backup - Weekly', date: '2025-10-28', size: '22.1 MB', type: 'Automatic' }
    ]);
    const [showScheduleModal, setShowScheduleModal] = React.useState(false);
    const [schedule, setSchedule] = React.useState({ frequency: 'daily', time: '02:00', day: 'Monday' });

    const handleCreateBackup = () => {
      const choice = confirm('Create Manual backup now?\n\nOK = Manual (immediate)\nCancel = Schedule Automatic');
      if (choice) {
        const backup = {
          id: Date.now(),
          name: 'Manual Backup',
          date: new Date().toISOString().split('T')[0],
          size: '25.2 MB',
          type: 'Manual'
        };
        setBackups([backup, ...backups]);
        alert('Manual backup created successfully!');
      } else {
        setShowScheduleModal(true);
      }
    };

    const handleScheduleBackup = () => {
      alert(`Automatic backup scheduled:\nFrequency: ${schedule.frequency}\nTime: ${schedule.time}\n${schedule.frequency === 'weekly' ? `Day: ${schedule.day}` : ''}`);
      setShowScheduleModal(false);
    };

    const handleRestore = (backup) => {
      if (confirm(`Restore from "${backup.name}"?\n\nThis will restore all data from this backup.`)) {
        alert('System restored successfully from backup!');
      }
    };

    const handleDownload = (backup) => {
      const dataStr = JSON.stringify(backup, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${backup.name.replace(/\s+/g, '_')}_${backup.date}.json`;
      link.click();
    };

    const handleRestoreFromFile = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target.result);
              if (confirm('Restore from this file?')) {
                alert('System restored from file successfully!');
              }
            } catch (err) {
              alert('Invalid backup file!');
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    };

    return (
      <div data-name="backup-center" data-file="components/admin/BackupCenter.js">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Backup Center</h1>
          <div className="flex space-x-2">
            <button onClick={handleRestoreFromFile} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              <div className="icon-upload text-lg"></div>
              <span>Restore from File</span>
            </button>
            <button onClick={handleCreateBackup} className="flex items-center space-x-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
              <div className="icon-database text-lg"></div>
              <span>Create Backup</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-check-circle text-2xl text-green-600"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Last Backup</h3>
            <p className="text-2xl font-bold text-[var(--primary-color)]">Today</p>
            <p className="text-sm text-gray-500">11:30 AM</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-hard-drive text-2xl text-blue-600"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Total Backups</h3>
            <p className="text-2xl font-bold text-[var(--primary-color)]">{backups.length}</p>
            <p className="text-sm text-gray-500">Available</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-archive text-2xl text-purple-600"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Storage Used</h3>
            <p className="text-2xl font-bold text-[var(--primary-color)]">70.4 MB</p>
            <p className="text-sm text-gray-500">Total Size</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Backup History</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Backup Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Size</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map(backup => (
                <tr key={backup.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{backup.name}</td>
                  <td className="px-6 py-4">{backup.date}</td>
                  <td className="px-6 py-4">{backup.size}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      backup.type === 'Automatic' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleRestore(backup)} className="text-green-600 hover:underline mr-3">Restore</button>
                    <button onClick={() => handleDownload(backup)} className="text-blue-600 hover:underline">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Schedule Automatic Backup</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Frequency</label>
                  <select value={schedule.frequency} onChange={e => setSchedule({...schedule, frequency: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input type="time" value={schedule.time} onChange={e => setSchedule({...schedule, time: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                {schedule.frequency === 'weekly' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Day of Week</label>
                    <select value={schedule.day} onChange={e => setSchedule({...schedule, day: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex space-x-2 mt-4">
                <button onClick={handleScheduleBackup} className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">Schedule</button>
                <button onClick={() => setShowScheduleModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('BackupCenter error:', error);
    return null;
  }
}