function UserManagement() {
  try {
    const [users, setUsers] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [editUser, setEditUser] = React.useState(null);

    React.useEffect(() => {
      loadUsers();
    }, []);

    const loadUsers = async () => {
      const result = await trickleListObjects('user', 100, true);
      setUsers(result.items);
    };

    const handleSave = async () => {
      if (editUser.objectId) {
        await trickleUpdateObject('user', editUser.objectId, editUser);
      } else {
        await trickleCreateObject('user', editUser);
      }
      setShowModal(false);
      setEditUser(null);
      loadUsers();
    };

    const openEdit = (user) => {
      setEditUser(user ? {...user.objectData, objectId: user.objectId} : {
        firstName: '', middleName: '', surname: '', gender: '', email: '', phone: '', 
        role: 'Staff', position: '', password: ''
      });
      setShowModal(true);
    };

    return (
      <div data-name="user-management" data-file="components/admin/UserManagement.js">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <button onClick={() => openEdit(null)} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
            Add User
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.objectId} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.objectData.firstName} {user.objectData.surname}</td>
                  <td className="px-6 py-4">{user.objectData.email}</td>
                  <td className="px-6 py-4">{user.objectData.role}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => openEdit(user)} className="text-[var(--primary-color)] hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && editUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl m-4">
              <h3 className="text-xl font-bold mb-4">{editUser.objectId ? 'Edit' : 'Add'} User</h3>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" value={editUser.firstName} onChange={e => setEditUser({...editUser, firstName: e.target.value})} className="px-4 py-2 border rounded-lg" />
                <input placeholder="Middle Name" value={editUser.middleName} onChange={e => setEditUser({...editUser, middleName: e.target.value})} className="px-4 py-2 border rounded-lg" />
                <input placeholder="Surname" value={editUser.surname} onChange={e => setEditUser({...editUser, surname: e.target.value})} className="px-4 py-2 border rounded-lg" />
                <select value={editUser.gender} onChange={e => setEditUser({...editUser, gender: e.target.value})} className="px-4 py-2 border rounded-lg">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input type="email" placeholder="Email" value={editUser.email} onChange={e => setEditUser({...editUser, email: e.target.value})} className="px-4 py-2 border rounded-lg" />
                <input type="tel" placeholder="Phone +254..." value={editUser.phone} onChange={e => setEditUser({...editUser, phone: e.target.value.replace(/\D/g, '')})} className="px-4 py-2 border rounded-lg" />
                <input placeholder="Position" value={editUser.position} onChange={e => setEditUser({...editUser, position: e.target.value})} className="px-4 py-2 border rounded-lg" />
                <select value={editUser.role} onChange={e => setEditUser({...editUser, role: e.target.value})} className="px-4 py-2 border rounded-lg">
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
                <input type="password" placeholder="Password" value={editUser.password} onChange={e => setEditUser({...editUser, password: e.target.value})} className="px-4 py-2 border rounded-lg col-span-2" />
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
    console.error('UserManagement error:', error);
    return null;
  }
}