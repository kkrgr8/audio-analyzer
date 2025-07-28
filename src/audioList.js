    import { useState, useRef, useEffect, useMemo} from 'react';
    import useAudioStore from './store';
    import API_URL from './constant';
    const AudioList = (props) => {
     const { getCurrentID, updateStep, addAudio, addCurretnAudio, clearSummary, addSummary, clearAll, addBasicDetails, addIntent, clearTranscript, addTranscript } = useAudioStore()
      //const currentStep = useAudioStore(state => state.current_step);
      const audioArray = useAudioStore(state => state.audioArray)
        const [loading, setLoading] = useState(true);
        const handleClick = (a) => {
        props.isData(a); // Calling the parent function and passing data
      };

        const intervalRef = useRef(null);

      

      const progress = useMemo(() => ({
        'audio.upload': 2,
        'transcript.start': 2,
        'transcript.fail': 2,
        'transcript.end': 2,
        'analysis.start': 3,
        'analysis.fail': 3,
        'analysis.end': 4,
        'summary.start': 4,
        'summary.fail': 4,
        'summary.end': 5
      }), []); // Empty dependency since it's static



      const fetchUsers = async () => {
          try {
            setLoading(true);
            // Mock API call - replace with your actual API endpoint
            clearAll();
            const response = await fetch(API_URL+"/audios").then((res) => res.json())
            .then((data) => {
            addAudio(data.audios);
            });
            if (!response.ok) {
      throw new Error("Failed to fetch audio details");
    }
    
           
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
        // eslint-disable-next-line
            return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
        // eslint-disable-next-line
        }, []);

      const handleUserClick = async (audio_id) => {
      if(audio_id === undefined){
        audio_id = getCurrentID();
      }
  
      addCurretnAudio(audio_id);
  
  // REMOVE THIS LINE - it's causing extra calls
  // setTimeout(handleUserClick, 1000);
  
  try {
    // Call API for user details
    const response = await fetch(API_URL+`/audios/${audio_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch audio details");
    }
    
    const userDetails = await response.json();
    addBasicDetails(userDetails);
    addIntent("Positive");
    console.log("Audio details:", progress[userDetails.stage]);
    updateStep(progress[userDetails.stage]);
    clearTranscript();
    fetchTranscriptId(audio_id, progress[userDetails.stage]);
    
    // Check if we should stop polling (add your condition here)
    if (progress[userDetails.stage] === 5 || userDetails.stage?.split('.')[1]==='fail') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log('Polling stopped - stage is end/failed');
      }
      return;
    }
    
    // Start polling if not already started
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        handleUserClick(audio_id);
      }, 10000);
      console.log('Polling started');
    }
    
  } catch (err) {
    console.error("Error fetching user details:", err);
    // Mock API call for demonstration
    console.log(`Fetching details for user ID: ${audio_id}`);
  }
};

        const fetchTranscriptId = async (current_audio_id,progress) => {
          try {
            clearTranscript();
            // Mock API call - replace with your actual API endpoint
          
            const response = await fetch(API_URL+"/transcripts?aid="+current_audio_id).then((res) => res.json())
            .then((data) => {
            fetchTranscript(current_audio_id,data.transcripts[0].transcript_id,progress);
            fetchSummary(current_audio_id);
            });
            if (!response.ok) {
              throw new Error("Failed to fetch audio details");
            }
           
          } catch (err) {
            
            
          } finally {
          }
        };

        const fetchTranscript = async (current_audio_id,transcript_id,progress) => {
          try {
            clearTranscript();
            if(progress===4 ||progress===5 ){
              const response = await fetch(API_URL+"/analysis?audio_id="+current_audio_id).then((res) => res.json())
              .then((data) => {
              //addTranscript(data?.segments);
              fetchAnalyseData(data.analysis[0]?.analysis_id)
              });
              if (!response.ok) {
                throw new Error("Failed to fetch audio details");
              }
            }else{
              const response = await fetch(API_URL+"/transcripts/"+transcript_id).then((res) => res.json())
              .then((data) => {
              addTranscript(data?.segments);
             });

              if (!response.ok) {
                throw new Error("Failed to fetch audio details");
              }
            }
             
           
          } catch (err) {
            
            
          } finally {
          }
        };
        const fetchAnalyseData = async (analyse_id="") => {
          try {
            //clearSummary();
            // Mock API call - replace with your actual API endpoint
          
            const response = await fetch(API_URL+"/analysis/"+analyse_id).then((res) => res.json())
            .then((data) => {
            addTranscript(data?.segments);
            });
            if (!response.ok) {
              throw new Error("Failed to fetch audio details");
            }
           
          } catch (err) {
            
            
          } finally {
          }
        };
        const fetchSummary = async (current_audio_id="") => {
          try {
            clearSummary();
            // Mock API call - replace with your actual API endpoint
          
            const response = await fetch(API_URL+"/summaries?audio_id="+current_audio_id).then((res) => res.json())
            .then((data) => {
            addSummary(data?.summaries[0]?.summary);
            });
            if (!response.ok) {
              throw new Error("Failed to fetch audio details");
            }
           
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
                <h6 className="card-heading">
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
                          {user.label} 

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