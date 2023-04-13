import React,{useEffect,useState,useContext} from 'react'
import { NavLink,useParams } from 'react-router-dom'
import { UserContext } from '../../App'

export default function Profile() {

  const {state,dispatch}=useContext(UserContext)
  const [data,setData]=useState([])
  const {userid}=useParams
  console.log(userid)
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
      
      <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0",borderBottom:"1px solid grey"}}>
        <div>
<img style={{width:"160px",height:"160px",borderRadius:"50%"}} src="https://images.unsplash.com/photo-1523379204-ac6d21e877f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"/>
        </div>
        <div>
          <h4>{state.name}</h4>

<div style={{display:"flex",gap:"1rem",justifyContent:"space-between"}}>
  <h6>40 posts</h6>
  <h6>40 followers</h6>
  <h6>40 following</h6>
</div>
        </div>
      </div>
      <div className='gallery'>
       
     {
      
       data.map(item=>{
        return(
          <img className='item' src={item.photo} key={item._id}/>
        )
      })
     }
        
        

      </div>
      <NavLink to='/createPost'>New Post</NavLink>
    </div>
  )
}
