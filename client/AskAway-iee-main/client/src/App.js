import { Route,Routes,useNavigate}from 'react-router-dom'
import {useEffect,createContext,useReducer,useContext}from 'react'
import './App.css';
import DocLogin from './components/screens/DocLogin';

import Home from './components/screens/home';
import Profile from './components/screens/profile';
import DocSignup from './components/screens/DocSignup';
import Signup from './components/screens/signup';
import Login from './components/screens/login';
import NavBar from './components/Navbar';
import Create_post from './components/screens/create-post';
import { reducer,initialState } from '../src/reducers/userReducer'



export const UserContext=createContext();

const Routing=()=>{

  const Navigate=useNavigate();
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("user"));
  
  if(user)
  {
  Navigate('/')
  dispatch({type:"USER",payload:user})
  }
  else{
  Navigate('/login');
  }
  },[])
  return(
    <Routes>
    <Route path="/" element={<Home/>}/>
   
    <Route path='doc-login' element={<DocLogin/>}/>
  <Route path='/doc-signup' element={<DocSignup/>}/>
    <Route path="/profile" element={<Profile/>}/>      
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path='/createPost' element={<Create_post/>}/>
    


    </Routes>
  )
}
function App() {
const[state,dispatch]=useReducer(reducer,initialState)
  return (
    
    <div className="App">
   
    <UserContext.Provider value={{state,dispatch}}>
    <NavBar/>
   <Routing/>
    </UserContext.Provider>
    
    </div>
  );
}

export default App;
