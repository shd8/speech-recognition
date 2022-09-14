import React, { FC, MouseEventHandler, useRef, useState } from 'react'
import './App.scss'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const App: FC = () => {
  const TEXTAREA_COLUMNS: number = 30
  const TEXTAREA_ROWS: number = 10
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [isListening, setIsListening] = useState(false)
  const microphoneRef = useRef<HTMLElement>(null)

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (isListening) {
      stopListening()
    } else {
      resetTranscript()
      startListening()
    }
  }

  const startListening = (): void => {
    setIsListening(true)
    if (microphoneRef.current !== null) microphoneRef.current.classList.add('listening')
    void SpeechRecognition.startListening({
      language: 'en-US',
      continuous: true
    })
  }

  const stopListening = (): void => {
    setIsListening(false)
    if (microphoneRef.current !== null) microphoneRef.current.classList.remove('listening')
    SpeechRecognition.stopListening()
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <main>
      <textarea name=""
      id=""
      cols={TEXTAREA_COLUMNS}
      rows={TEXTAREA_ROWS}
      className='text--not-supported'
      onChange={() => {}}
      defaultValue="Your browser does not support Speech recognition"
      >
      </textarea>
      <button type='button' className='microphone-not-working'>
        <i className="fa-regular fa-circle-xmark"></i>
      </button>
      </main>
    )
  }
  return (
      <main>
      <textarea name=""
      id=""
      cols={TEXTAREA_COLUMNS}
      rows={TEXTAREA_ROWS}
      className='text'
      onChange={() => {}}
      value={transcript}
      >
      </textarea>

         <button type='button' className={`microphone ${isListening ? 'fade' : ''}`} onClick={handleOnClick}>
          <i className='fa-solid fa-microphone mic'></i>
        </button>
    </main>
  )
}

export default App
