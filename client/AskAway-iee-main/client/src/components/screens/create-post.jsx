import { useState } from "react"
import React from 'react'
import{useNavigate}from 'react-router-dom'

import M from 'materialize-css'


export default function Create_post() {
  const Navigate=useNavigate();
  const [user,setUser]=useState({
  
    title:"",
      body:"",
      
  })
 
let name,value
const handleInput=(e)=>{
  name=e.target.name
  value=e.target.value
  setUser({...user,[name]:value});


}

function submitPost(){
  
  fetch("/createpost",{
  
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "authorization":"Bearer "+localStorage.getItem("jwt")
    },
  

    body:JSON.stringify({
      title:user.title,
      body:user.body,
      
    })


  }).then(res=>res.json())
  .then(data=>{
    if(data.error)
    {
      M.toast({html:data.error,classes:"#c62828 red darken-3"})
  
    }
    else
    {
      M.toast({html:data.message,classes:"#c62828 green darken-3"})
      Navigate('/')
    }
  })
}
    
  return (
    <div className='create-post-container'>
      <div className="card input-filed create-post-div" style={{
        margin:"30px auto",
        padding:"20px",
        textAlign:"center"
      }}>
        <input type="text" placeholder='title' value={user.title} name="title" onChange={handleInput}  />
        <textarea  className="textarea" type="text" placeholder='body' value={user.body}  name="body" onChange={handleInput}/>
       
        
   
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>submitPost()} >
          Submit Post
  </button>
      </div>
    </div>
  )
}
