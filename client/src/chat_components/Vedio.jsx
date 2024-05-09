import React from 'react'
import { BiSolidCameraMovie } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export default function Vedio() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/lobby')
  }

  return (
    <div className="text-orange-400 text-4xl">
    <BiSolidCameraMovie onClick={handleClick}  />
  </div>
  )
}
