function UserProfile() {
  try {
    const [profile, setProfile] = React.useState({
      name: 'John Doe',
      email: 'john@structiform.com',
      role: 'Staff Designer',
      joinDate: '2024-03-15',
      tasksCompleted: 45,
      profilePicture: null
    });

    return (
      <div data-name="user-profile" data-file="components/staff/UserProfile.js">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {profile.profilePicture ? (
                  <img src={profile.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 bg-[var(--secondary-color)] rounded-full flex items-center justify-center">
                    <div className="icon-user text-4xl text-white"></div>
                  </div>
                )}
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--accent-color)]">
                  <div className="icon-camera text-sm text-white"></div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfile({...profile, profilePicture: reader.result});
                          alert('Profile picture updated! Admin will review.');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
              <p className="text-gray-500 mb-4">{profile.role}</p>
              <button className="w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <input type="text" value={profile.name} className="w-full px-4 py-2 border rounded-lg mt-1" />
              </div>
              <div>
                <label className="text-sm text-gray-500">Email Address</label>
                <input type="email" value={profile.email} className="w-full px-4 py-2 border rounded-lg mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Role (Admin Only)</label>
                  <input type="text" value={profile.role} disabled className="w-full px-4 py-2 border rounded-lg mt-1 bg-gray-100 cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Join Date</label>
                  <input type="text" value={profile.joinDate} disabled className="w-full px-4 py-2 border rounded-lg mt-1 bg-gray-50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <div className="icon-check-circle text-2xl text-green-600"></div>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">Tasks Completed</h3>
            <p className="text-3xl font-bold">{profile.tasksCompleted}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UserProfile error:', error);
    return null;
  }
}