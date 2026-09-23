import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { stories as storiesData, profile as myProfile } from './data';

const Stories = () => {
  const [stories, setStories]=useState([]);
  const navigate = useNavigate();
  let tot = 0;


  useEffect(()=>{
    setStories(storiesData)
  },[]);
console.log(stories);



  return (
    <div className='story d-flex'>
      <div className='d-none'>
        {tot=stories.length}

        </div>
      {/* Your story tile (mobile app style) */}
      <div className='mx-1 d-flex flex-column align-items-center' onClick={()=>{if(stories.length>0) navigate(`/story/1/${stories.length}`)}}>
        <div className='gradient-border story-mine'>
          <img src={myProfile.profilePic} alt="dp" className='story-dp'/>
          <span className='story-add'>+</span>
        </div>
        <p className='story-user'>Your story</p>
      </div>
      {stories. length > 0 ? (
          stories.map((story)=>(
            <div key={story.id} className='mx-1 d-flex flex-column align-items-center' onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
              <div className='gradient-border'>
                <img src={story.profilePic} alt="dp"  className='story-dp'/>
              </div>
              <p className='story-user'>{story.username}</p>
            </div>

        ))

      ) : (
        
        <p>Loading</p>
       
      )}
    </div>
  )
}

export default Stories
