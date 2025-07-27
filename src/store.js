import { create } from 'zustand'
const useAudioStore = create((set) => ({
  // State
  audioArray: [],
  current_audio_id:null,
  current_audio_basic:{},
  cuurent_intent:'Good',
  current_transcript:[],
  current_summary:null,

  // Actions
  clearTranscript: () => set((state) => ({
    current_transcript:[]
  })),

  clearSummary: () => set((state) => ({
    current_summary:null
  })),

  addSummary: (summary) => set((state) => ({
    current_summary:summary
  })),

  addTranscript: (transcript) => set((state) => ({
    current_transcript:transcript
  })),

  addIntent: (intent) => set((state) => ({
    cuurent_intent: intent
  })),
  addBasicDetails: (audio_basic) => set((state) => ({
    current_audio_basic: audio_basic
  })),
  addCurretnAudio: (audio_id) => set((state) => ({
    current_audio_id: audio_id
  })),

  addAudio: (audio) => set((state) => ({
    audioArray: [...state.audioArray, audio]
  })),

  updateAudio: (audio_id, updatedAudio) => set((state) => ({
    audioArray: state.audioArray.map(audio => 
      audio.audio_id === audio_id 
        ? { ...audio, ...updatedAudio }
        : audio
    )
  })),

  deleteAudio: (audio_id) => set((state) => ({
    audioArray: state.audioArray.filter(audio => audio.audio_id !== audio_id)
  })),

  clearAll: () => set(() => ({
    audioArray: []
  })),

  // Getters
  getAllAudio: () => {
    return useAudioStore.getState().audioArray
  },

  getAudioById: (audio_id) => {
    return useAudioStore.getState().audioArray.find(audio => audio.audio_id === audio_id)
  }
}))

export default useAudioStore

// Usage example:
/*
// In your component:
import useAudioStore from './audioStore'

const AudioComponent = () => {
  const { audioArray, addAudio, updateAudio, deleteAudio, clearAll, getAllAudio, getAudioById } = useAudioStore()

  // Add audio
  const handleAdd = () => {
    addAudio({
      audio_id: 'audio_1',
      label: 'Sample Audio',
      duration: 120
    })
  }

  // Update audio
  const handleUpdate = () => {
    updateAudio('audio_1', {
      label: 'Updated Audio',
      duration: 150
    })
  }

  // Delete audio
  const handleDelete = () => {
    deleteAudio('audio_1')
  }

  // Clear all
  const handleClearAll = () => {
    clearAll()
  }

  // Get all audio (alternative to using audioArray directly)
  const handleGetAll = () => {
    const allAudio = getAllAudio()
    console.log(allAudio)
  }

  // Get audio by ID
  const handleGetById = () => {
    const audio = getAudioById('audio_1')
    console.log(audio)
  }

  return (
    <div>
      {audioArray.map(audio => (
        <div key={audio.audio_id}>
          {audio.label} - {audio.duration}s
        </div>
      ))}
    </div>
  )
}
*/