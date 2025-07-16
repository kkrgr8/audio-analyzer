    import React, { useState , useEffect} from 'react';
    
    const AudioList = () => {
        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
          fetchUsers();
        }, []);

        const fetchUsers = async () => {
          try {
            setLoading(true);
            // Mock API call - replace with your actual API endpoint
            const response = await fetch("/api/audio");
            if (!response.ok) {
              throw new Error("Failed to fetch audio");
            }
            const data = await response.json();
            setUsers(data);
          } catch (err) {
            // Mock data for demonstration
            const mockUsers = [
              { id: 1, name: "Audio 1", duration: '10:01' },
              { id: 2, name: "Audio 2", duration: '5:34' },
              
            ];
            setUsers(mockUsers);
          } finally {
            setLoading(false);
          }
        };

        const handleUserClick = async (userId) => {
          try {
            // Call API for user details
            const response = await fetch(`/api/audio/${userId}`);
            if (!response.ok) {
              throw new Error("Failed to fetch audio details");
            }
            const userDetails = await response.json();
            console.log("Audio details:", userDetails);
          } catch (err) {
            console.error("Error fetching user details:", err);
            // Mock API call for demonstration
            console.log(`Fetching details for user ID: ${userId}`);
          }
        };

        if (loading) {
          return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading audios...</p>
              </div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-red-500 text-xl mb-4">⚠️</div>
                <p className="text-gray-600 text-lg">{error}</p>
              </div>
            </div>
          );
        }

        return (
          <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h6 className="text-4xl font-bold text-gray-900 mb-4">
                  AUDIO LIST
                </h6>
                
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {users.map((user, index) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    className={`
                                              flex items-center justify-between p-6 cursor-pointer transition-all duration-200
                                              hover:bg-gray-50 hover:shadow-sm active:bg-gray-100
                                              ${index !== users.length - 1 ? "border-b border-gray-100" : ""}
                                          `}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors duration-200">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-500">Duration: {user.duration}</p>
                      </div>
                    </div>
                    <div className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      };

      export default AudioList;