import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Suggestions from './Suggestions'

const App = () => {
  return (
    <div className='d-flex vh-100'>

      {/* Sidebar */}
      <div className='w-20 sidebar-column'>
        <Sidebar />
      </div>

      {/* Feed */}
      <div className='w-50 feed-column'>
        <Feed />
      </div>

      {/* Suggestions */}
      <div className='w-20'>
        <Suggestions />
      </div>

    </div>
  )
}

/* w-25 w-50 w-75 w-100 */

export default App