import React,{useContext,useEffect,useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import {UserContext}from '../App'

export default function Navbar() {
  const [data,setData]=useState("");
  const {state,dispatch} = useContext(UserContext); // use destructuring to get state and dispatch from the context
  useEffect(()=>{
    fetch("/mypost",{
      headers:{
          "authorization":"Bearer "+localStorage.getItem('jwt')
      }
    }).then(res=>res.json())
    .then(result=>{
      setData(result)
    })
  },[]) // add dependency array to avoid infinite loop
  
    const user=localStorage.getItem("user",JSON.stringify(data.user))
    const doc=localStorage.getItem("doctor",JSON.stringify(data.doctor))

  
  const Navigate=useNavigate()
  const removeLocal=()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    Navigate('/login')
  }

  const RenderList=()=>{
     {
      
      if(user || doc)
      {
      return(
        <div>
          <li><NavLink className="nav-links"  to="/">Home</NavLink></li>
          <li><NavLink className="nav-links"  to="/createPost">Ask Questions</NavLink></li>
          <li><NavLink className="nav-links"  to="/profile">My Questions</NavLink></li>
          <li><a href='file:///C:/Users/veere/AppData/Local/Temp/Temp1_DocApp-master.zip/DocApp-master/cards.html'>Govt Schemes</a></li>
          <li>
            <button className="btn waves-effect-light #64b5f6 red darken" onClick={removeLocal}>
              Logout
            </button>
          </li>
        </div>
      )
      }
    }
    return (
      <div>
        <li><NavLink className="nav-links"  to="/login">Login</NavLink></li>
        <li><NavLink className="nav-links"  to="/signup">Signup</NavLink></li>
        <li><NavLink className="nav-links"  to="/doc-login">Doctor Login</NavLink></li>
        <li><NavLink className="nav-links"  to="/doc-signup">Doctor Signup</NavLink></li>
      </div>
    )
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <a href='#' className="left brand-logo">AskAway</a>
          <ul id="nav-mobile" className="right ">
            <RenderList/>
          </ul>
        </div>
      </nav>
    </div>
  )
}
