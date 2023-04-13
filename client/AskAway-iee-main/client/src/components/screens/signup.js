import React,{useState} from 'react'
import{useNavigate} from'react-router-dom'
import M from 'materialize-css'

export default function Signup() {
  const navigate=useNavigate()
const [user,setUser]=useState({
  name:"",
  email:"",
  password:""
})
let name,value;
const handleInputs=(e)=>{

  name=e.target.name
  value=e.target.value
  setUser({...user,[name]:value});

}

  const PostData=async(e)=>{
    e.preventDefault();
    const{ name,email,password}=user;
    const res=await fetch("/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,password
      })
    });
  const data= await res.json();
    if(!data){
window.alert('Invalid Signup')
    }
    else if(data.error)
    {
      M.toast({html:data.error})
    }
    else{
      M.toast({html:data.message});
      navigate('/login')
    
    }

    
  }
  return (
    <div className='mycard'>
      <div className='card auth-card'>
        <h2 >AskAway</h2>
        <form>
        <input type="text" className='input-field' placeholder="name" name="name"value={user.name} onChange={handleInputs} autoComplete="off"/>
        <input type="email" className='input-field' placeholder="email" name='email' value={user.email}  onChange={handleInputs} autoComplete="off"/>
        <input type="password" className='input-field' placeholder='password' name='password' value={user.password} onChange={handleInputs} autoComplete="off"/>


        <input type='submit' name='signup' className="btn waves-effect waves-light #64b5f6 blue darken-1"  value="Sign-Up" onClick={PostData}/>
  </form>
        
      </div>
    </div>
  )
}
