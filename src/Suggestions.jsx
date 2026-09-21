import React, { useEffect, useState } from 'react'
import SwitchAccount from './SwitchAccount'
import { profile as profileData, suggestions as suggestionsData } from './data'

const Suggestions = () => {
const [profile,setProfile]= useState(null);
const [Suggestions,setSuggestions]=useState([]);
const [showSwitch,setShowSwitch]=useState(false);
const [followed,setFollowed]=useState({});

const toggleFollow = (id) => {
  setFollowed((f) => ({ ...f, [id]: !f[id] }));
};

useEffect(()=>{
setProfile(profileData)
setSuggestions(suggestionsData)
},[])

  return (
    <div>
      <div className='suggestions w-75 m-4'>
        {profile  ?
      <div className='d-flex'>
                <img className='dp rounded-circle m' src={profile.profilePic} alt="Profile pic" />
                <h5>{profile.username}</h5>
                <small
                  className='ms-auto text-primary'
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowSwitch(true)}
                >
                  Switch
                </small>
              </div>
              : <p>Loading</p>}

              <div className='d-flex'>
                <p>Suggested for you</p>
                <b className='ms-auto'>See All</b>
              </div>
     
      {Suggestions.length > 0 ? (
        <div>
           {Suggestions.map((suggestion)=>(
            <div className='my-2' key={suggestion.id}>
              <div className='d-flex'>
                <img className='dp rounded-circle' src={suggestion.profilePic} alt="Profile pic" />
                <h5>{suggestion.username}</h5>
                <p
                  className='ms-auto'
                  style={{
                    cursor: "pointer",
                    color: followed[suggestion.id] ? "#737373" : "#0095f6",
                    fontWeight: 600,
                    margin: 0,
                  }}
                  onClick={() => toggleFollow(suggestion.id)}
                >
                  {followed[suggestion.id] ? "Following" : "Follow"}
                </p>
              </div>            
            </div>
           ))}
            </div>
            ):(
            <div>
                Loading 
                </div>
              )}

  </div>

      {showSwitch && <SwitchAccount onClose={() => setShowSwitch(false)} />}
     </div>
  )
}

export default Suggestions
