import React, { useEffect, useState } from 'react'

const Suggestions = () => {
const [profile,setProfile]= useState(null);
const [Suggestions,setSuggestions]=useState([]);

useEffect(()=>{
fetch("http://localhost:3000/profile")
.then(data=> data.json())
.then(data=> setProfile(data))
.catch((err)=>console.log(err))

fetch("http://localhost:3000/suggestions")
.then(data=> data.json())
.then(data=> setSuggestions(data))
.catch((err)=>console.log(err))


},[])

  return (
    <div>
      <div className='suggestions m-4'>
        {profile  ?
      <div className='d-flex'>
                <img className='dp rounded-circle m' src={profile.profilePic} alt="Profile pic" />
                <h5>{profile.username}</h5>
                <small className='ms-auto text-primary'>Switch</small>
              </div> 
              : <p>Loading</p>}
              

              <div className='d-flex my-2'>
                <p>Suggested for you</p>
                <b className='ms-auto'>See All</b>
              </div>
     
      {Suggestions.length > 0 ? (
        <div>
           {Suggestions.map((suggestion)=>(
            <div className='my-2' key={suggestion.id}>
              <div className='d-flex'>
                <img className='dp rounded-circle ' src={suggestion.profilePic} alt="Profile pic" />
                <h5>{suggestion.username}</h5>
                <div>
                <p className='text-primary ms-auto ' >Follow </p>
                </div>
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
    </div>
  )
}

export default Suggestions
