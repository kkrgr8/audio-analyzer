    import { useState , useEffect} from 'react';
    import useAudioStore from './store';
    import StatusSpan from './audioState';
    
    const AudioList = (props) => {
     const { addAudio, addCurretnAudio, clearSummary, addSummary, clearAll, addBasicDetails, addIntent, clearTranscript, addTranscript } = useAudioStore()

      const audioArray = useAudioStore(state => state.audioArray)
        const [loading, setLoading] = useState(true);
        const handleClick = (a) => {
        props.isData(a); // Calling the parent function and passing data
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const fetchUsers = async () => {
          try {
            setLoading(true);
            // Mock API call - replace with your actual API endpoint
            clearAll();
            const response = await fetch("https://hack.purambokku.xyz/api/audios").then((res) => res.json())
            .then((data) => {
              console.log(response);
            addAudio(data.audios);
            });
           
          } catch (err) {
            console.log(err,'testing');
            // Mock data for demonstration
            const mockUsers = [
            ];
            if(mockUsers.length!==0){
              handleClick(true)
            }
            //setUsers(mockUsers);
          } finally {
            setLoading(false);
          }
        };
         // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => {
           // eslint-disable-next-line
          fetchUsers();
        }, []);

        

        const handleUserClick = async (audio_id) => {
          addCurretnAudio(audio_id)
          try {
            // Call API for user details
            const response = await fetch(`https://hack.purambokku.xyz/api/audios/${audio_id}`);
            if (!response.ok) {
              throw new Error("Failed to fetch audio details");
            }
            const userDetails = await response.json();
            addBasicDetails(userDetails);
            addIntent("Positive")
            console.log("Audio details:", userDetails);
            clearTranscript()
            fetchTranscriptId(audio_id)
          } catch (err) {
            console.error("Error fetching user details:", err);
            // Mock API call for demonstration
            console.log(`Fetching details for user ID: ${audio_id}`);
          }
          
        };

        const fetchTranscriptId = async (current_audio_id) => {
          try {
            clearTranscript();
            // Mock API call - replace with your actual API endpoint
          
            const response = await fetch("https://hack.purambokku.xyz/api/transcripts?aid="+current_audio_id).then((res) => res.json())
            .then((data) => {
            console.log(response);
            fetchTranscript(data.transcripts[0].transcript_id);
            fetchSummary();
            });
            
           
          } catch (err) {
            
            
          } finally {
          }
        };

        const fetchTranscript = async (transcript_id) => {
          try {
            clearTranscript();
            // https://hack.purambokku.xyz/api/analysis0801558f827a41be9f1d3b77cad69392
          
            // const response = await fetch("https://hack.purambokku.xyz/api/transcripts/"+transcript_id).then((res) => res.json())
            // .then((data) => {
            // addTranscript(data?.segments);
            // });

             const response = await fetch("https://hack.purambokku.xyz/api/analysis0801558f827a41be9f1d3b77cad69392").then((res) => res.json())
             .then((data) => {
              console.log(response);
             addTranscript(data?.segments);
             });
            
           
          } catch (err) {
            
            
          } finally {
          }
        };

        const fetchSummary = async (transcript_id="") => {
          try {
            clearSummary();
            // Mock API call - replace with your actual API endpoint
          
            const response = await fetch("https://hack.purambokku.xyz/api/summaries7b36913a264343b6b37886121a0cf373").then((res) => res.json())
            .then((data) => {
              console.log(response);
            addSummary(data?.summary);
            });
            
           
          } catch (err) {
            
            
          } finally {
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

        return (
          <div className="min-h-screen bg-gray-50">
            <div className="">
              <div className="text-center">
                <h6 className="text-4xl font-bold text-gray-900">
                  Recordings
                </h6>
                
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-scroll" style={{ height: '900px' }}>
                {audioArray[0]?.map((user, index) => (
                  <div
                    key={user.audio_id}
                    onClick={() => handleUserClick(user.audio_id)}
                    className={`
                                              flex items-center justify-between p-6 cursor-pointer transition-all duration-200
                                              hover:bg-gray-50 hover:shadow-sm active:bg-gray-100
                                              ${index !== audioArray.length - 1 ? "border-b border-gray-100" : ""}
                                          `}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {user.label.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors duration-200">
                          {user.label} <StatusSpan status={user.stage} />

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