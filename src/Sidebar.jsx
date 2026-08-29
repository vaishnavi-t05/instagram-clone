import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()

const handleLogout = async () => {
  try {
    await signOut(auth)
    navigate('/login')
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='m-3 position-fixed'>

      <div className='d-flex flex-column gap-3'>
        <img
          className='logo-text'
          src="src\assets\instagram-images.png"
          alt=""
        />

        <div>
          <i className="bi bi-house-door-fill"></i> Home
        </div>

        <div>
          <i className="bi bi-search"></i> Search
        </div>

        <div>
          <i className="bi bi-compass"></i> Explore
        </div>

        <div>
          <i className="bi bi-play-btn"></i> Reels
        </div>

        <div>
          <i className="bi bi-chat"></i> Messages
        </div>

        <div>
          <i className="bi bi-heart"></i> Notifications
        </div>

        <div>
          <i className="bi bi-plus-square"></i> Create
        </div>

        <div>
          <i className="bi bi-person-circle"></i> Profile
        </div>
      </div>

      <div className='position-fixed bottom-0 d-flex flex-column gap-3 mb-3'>

        <div>
          <i className="bi bi-threads"></i> Threads
        </div>

        <div>
          <i className="bi bi-list"></i> More
        </div>

        {/* LOGOUT */}
        <div onClick={handleLogout}>
  <i className="bi bi-box-arrow-right"></i> Logout
</div>

      </div>

    </div>
  )
}

export default Sidebar