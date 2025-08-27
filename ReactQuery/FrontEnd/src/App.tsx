import React from 'react'
import { Button } from './components/ui/button'
import { useNavigate } from 'react-router-dom'

const App: React.FC = () => {
  const navigate = useNavigate()
  const handleOnClick = ()  => {
    navigate('/about')
  }

  return (
    <>
      <div>Home Page</div>
      <Button onClick={handleOnClick}>About</Button>
    </>
  )
}

export default App