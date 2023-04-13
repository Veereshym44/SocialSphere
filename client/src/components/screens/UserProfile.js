import React,{useEffect,useState,useContext} from 'react'
import { useParams,NavLink } from 'react-router-dom'
import { UserContext } from '../../App'

 export default function UserProfile() {

  const {state,dispatch}=useContext(UserContext)
  const [data,setData]=useState(null)
  const {userid}=useParams()

  useEffect(() => {
    // Fetch data here
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userid]); // Add dependency on userid
// Empty dependency array to ensure effect runs only once

 

 
  return (
<div>

{
  data ?    <div className="proflie-main-div">
      
  <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0",borderBottom:"1px solid grey"}}>
    <div>
<img style={{width:"160px",height:"160px",borderRadius:"50%"}} src="https://images.unsplash.com/photo-1523379204-ac6d21e877f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"/>
    </div>
    <div>
      <h4>{data.user.name}</h4>
      

<div style={{display:"flex",gap:"1rem",justifyContent:"space-between"}}>
<h6>{data.posts.length} Posts</h6>
<h6>40 followers</h6>
<h6>40 following</h6>

</div>
<NavLink className="nav-links" to="/">
<button
className="btn waves-effect-light #64b5f6 blue darken"
style={{display:"flex",justifyContent:"center",margin:"2% auto"}}
>
Home
</button>
</NavLink>
    </div>
  </div>
  <div className='gallery'>
   
 {
  
   data.posts.map(item=>{
    return(
      <img className='item' src={item.photo} key={item._id}/>
    )
  })
 }
    
    

  </div>

</div>
:
<h2> Loading.....</h2>
}


</div>

  )
}