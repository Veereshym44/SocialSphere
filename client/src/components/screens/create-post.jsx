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
  const [url,setUrl]=useState("");
  const [image,setImage]=useState("")
let name,value
const handleInput=(e)=>{
  name=e.target.name
  value=e.target.value
  setUser({...user,[name]:value});


}
const postDetails=async()=>{

  const data=new FormData()
  data.append("file",image)
  data.append("upload_preset","instagram-clone")
  data.append("cloud_name","dkee20uoj")
  const res=await fetch("https://api.cloudinary.com/v1_1/dkee20uoj/image/upload",{
    method:"post",
    body:data
  }).then(res=>res.json())
  .then(data=>{
   
    setUrl(data.secure_url);
    console.log(url)
    if(url!="")
    submitPost()

  })
  .catch(err=>console.log(err));


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
      photo:url
    })


  }).then(res=>res.json())
  .then(data=>{
    if(data.error)
    {
      M.toast({html:data.error,classes:"#c62828 red darken-3"})
      console.log(url)
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
        <input type="text" placeholder='body' value={user.body}  name="body" onChange={handleInput}/>
        
        <div className="file-field input-field">
      <div className="btn waves-effect waves-light #64b5f6 blue darken-1">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])
        console.log(e.target.files)}}/>
      
      </div>
      
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postDetails()} >
          Submit Post
  </button>
      </div>
    </div>
  )
}
