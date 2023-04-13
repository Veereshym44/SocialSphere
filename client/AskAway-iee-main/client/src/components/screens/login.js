import React,{useState,useContext} from 'react'
import{useNavigate,NavLink}from 'react-router-dom'
import{UserContext}from '../../App'

import M from 'materialize-css'

export default function Login() {
  const {state,dispatch}=useContext(UserContext)
  const [user,setUser]=useState({
  
    email:"",
    password:""
  })
  const Navigate=useNavigate();
  let name,value;
const handleChange=(e)=>{

  name=e.target.name
  value=e.target.value
  setUser({...user,[name]:value});

} 
const PostData=async(e)=>{
  e.preventDefault()
  const{ email,password}=user;
  const res=await fetch("/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,email,password
    })
  }).then(res=>res.json())
  .then(data=>{
    console.log(data)
    if(data.error){
      M.toast({html:data.error})
      console.log(data.error);
    }
    else{
      M.toast({html:data.message})
      dispatch({type:"USER",payload:data.user});
      console.log(data.token)
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      Navigate('/')
    }
  })

}
  return (
    
    <div className='mycard'>
      <div className='card auth-card'>
        <h2 style={{  fontFamily: 'Roboto'}}>AskAway</h2>
        <form >
        <input type="text"  name="email" autoComplete="off" value={user.email}className='input-field' placeholder="email" onChange={handleChange}/>
        <input type="password" name="password" autoComplete="off" value={user.password}className='input-field' placeholder='password'onChange={handleChange}/>


        <input type='submit' name='signup' className="btn waves-effect waves-light #64b5f6 blue darken-1"  value="Login" onClick={PostData}/>
        <br/>

        <NavLink className="nav-links-login"  to="/signup">Dont have a account? Signup</NavLink>
  </form>
      </div>
    </div>
  )
}
