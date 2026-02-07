function BookingManager() {
  try {
    const [bookings, setBookings] = React.useState([]);

    React.useEffect(() => {
      loadBookings();
    }, []);

    const loadBookings = async () => {
      const result = await trickleListObjects('booking', 100, true);
      setBookings(result.items);
    };

    const handleDelete = async (id) => {
      if (confirm('Delete this booking?')) {
        await trickleDeleteObject('booking', id);
        loadBookings();
      }
    };

    const handleVerify = async (id) => {
      const booking = bookings.find(b => b.objectId === id);
      await trickleUpdateObject('booking', id, {...booking.objectData, verified: true});
      loadBookings();
      alert('Booking verified successfully!');
    };

    return (
      <div data-name="booking-manager" data-file="components/admin/BookingManager.js">
        <h1 className="text-3xl font-bold mb-6">Customer Bookings</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.objectId} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{booking.objectData.firstName} {booking.objectData.lastName}</td>
                  <td className="px-6 py-4">{booking.objectData.email}</td>
                  <td className="px-6 py-4">{booking.objectData.phone}</td>
                  <td className="px-6 py-4">{booking.objectData.product}</td>
                  <td className="px-6 py-4">{new Date(booking.objectData.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    {booking.objectData.verified ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Verified</span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!booking.objectData.verified && (
                      <button onClick={() => handleVerify(booking.objectId)} className="text-green-600 hover:underline mr-3">Verify</button>
                    )}
                    <button onClick={() => handleDelete(booking.objectId)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BookingManager error:', error);
    return null;
  }
}