import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { stories as storiesData } from './data';

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
