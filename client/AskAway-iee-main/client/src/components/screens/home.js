import React,{useState,useEffect}from 'react'
import axios from 'axios'
function Home() {
const [data,setData]=useState([])
const [ans,setAns]=useState([])
const [ren,setRen]=useState([])
const [ansValues, setAnsValues] = useState({});
const [rd,setRd]=useState("")
    useEffect(()=>{
       
fetch("/allpost",{
    headers:{
        "authorization":"Bearer "+localStorage.getItem('jwt')
    }
}).then(res=>res.json())
.then(result=>{
   setData(result.posts)


})
// fetch("/allanswers",{
//     headers:{
//         "authorization":"Bearer "+localStorage.getItem('jwt')
//     }

// }).then(res=>res.json())
// .then(result=>{
//     setRen(result.answers)
// })
axios.get('http://localhost:5000/allanswers',{

}).then(res=>res.json())
.then(result=>{
    setRen(result)
    console.log(result);
})


    },[])
  
   const user=localStorage.getItem("user",JSON.stringify(data.user))
   const doc=localStorage.getItem("doctor",JSON.stringify(data.doctor)) 


    if(user)
    {
        
    return ( 
        
        <div className='home-container'>
         {

            data.map((item,indx)=>{
                return(
                               
<div key={item._id} className="card home-card" >

  
    <div className='card-content'>
    <div>
    <h3>{item.title}</h3>
    </div>
        <hr/>
        
        <p>{item.body}</p>

        {
            ren.map(ans=>{
                console.log(ans.postId)
                if(ans.postId==item._id){
                    return(
                        <div>
                            <p>{ans.text}</p>
                        </div>
                    )
                }
              

            })
        }
        <i className="material-icons" style={{color:"red"}}>favorite</i>
        
 
    </div>
</div>
                )
            })
         } 
         
 
        </div>
        
     )};
     if(doc)
     {
        const docId = JSON.parse(localStorage.getItem("doctor"))._id;
        console.log(docId);
        const makeReply=(text,postId,docId)=>{
            axios.post('http://localhost:5000/answers',{
               
                    postId:postId,
                    text:text,
                    docId:docId
                })
                .then(arr=>{
                    console.log(arr)
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        

        const handleInput=(e,index)=>{
            const value=e.target.value
            setAns(ans[index]=value);
         }
         
        
          
       return(


        <div className='home-container'>
         
         {
           

            // ...
            
            data.map((item, idx) => {
              return (
                <div key={item._id} className="card home-card">
                   
                  <div className='card-content'>
                    <div>
                      <h3>{item.title}</h3>
                    </div>
                    <hr/>
                    <p>{item.body}</p>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      makeReply(ansValues[idx], item._id, docId);
                      setAnsValues({ ...ansValues, [idx]: '' }); 
                      


                    }}>
                      <textarea
                        className="textarea"
                        type="text"
                        placeholder='body'
                        value={ansValues[idx] || ''}
                        name={`ans_${idx}`}
                        onChange={(e) => {
                          setAnsValues({ ...ansValues, [idx]: e.target.value });
                        }}
                      />
                      <button type='submit' style={{width:"10%"}} >Submit</button>
                    </form>
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                  </div>
                </div>
              )
            })
            
         }
 
        </div>
       ) 
     }
}


export default Home;