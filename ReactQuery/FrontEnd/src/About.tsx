import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button'

const About: React.FC = () => {

  const navigate = useNavigate()
  const handleOnClick = ()  => {
    navigate('/data')
  }

  return (
    <>
      <div>About</div>
      <Button className='bg-red-500 text-white' onClick={handleOnClick}>Data</Button>
    </>
  )
}

export default About