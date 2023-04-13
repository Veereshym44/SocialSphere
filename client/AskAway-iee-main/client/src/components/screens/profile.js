import React,{useEffect,useState,useContext} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

export default function Profile() {
const Navigate=useNavigate();
  const {state,dispatch}=useContext(UserContext);
   useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    
    if(user)
    {
    Navigate('/profile')
    dispatch({type:"USER",payload:user})
    }
    else{
    Navigate('/login');
    }
    },[])

  const [data,setData]=useState([])
  useEffect(()=>{
fetch("/mypost",{
  headers:{
      "authorization":"Bearer "+localStorage.getItem('jwt')
  }
}).then(res=>res.json())
.then(result=>{

 setData(result.mypost)

  
})
  
},[])
  return (
    <div className="proflie-main-div">
      
     
      <div className='myQue'>
       
     {
      
       data.map(item=>{
        return(
         
                                        
<div className="card home-card" >
    
  
    <div className='card-content'>
    <div>
    <h3>{item.title}</h3>
    </div>
        <hr/>
        
        <h6>{item.body}</h6>
        <i className="material-icons" style={{color:"red"}}>favorite</i>
        
    
    </div>
</div>
        )
      })
     }
        
        

      </div>
      <NavLink to='/createPost'>New Post</NavLink>
    </div>
  )
}
