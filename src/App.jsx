import { useState } from 'react'
import ImageSwipper from './ImageSwipper/ImageSwipper'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageSwipper />
    </>
  )
}

export default App
