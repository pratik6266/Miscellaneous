import React from 'react'
import { Button } from './components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'toast-with-fun'

const App: React.FC = () => {
  const navigate = useNavigate()
  const handleOnClick = ()  => {
    navigate('/about')
  }

  return (
    <>
      <div>Home Page</div>
      <Button onClick={handleOnClick}>About</Button>
      <Button onClick={() => Toast.success('This is a success message!')}>Show Success Toast</Button>
    </>
  )
}

export default App