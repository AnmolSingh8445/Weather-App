import { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='parent_div'>
        <div className='main_div'>
          <h1>WEATHER APP</h1>
          <SearchBar />
        </div>
      </div>
    </>
  )
}

export default App
