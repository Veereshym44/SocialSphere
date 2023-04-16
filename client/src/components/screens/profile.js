import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../App';

export default function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch('/mypost', {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result && result.mypost && Array.isArray(result.mypost)) {
          setData(result.mypost);
        } else {
          setData([]); // Set data to an empty array if result.mypost is not an array
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData([]); // Set data to an empty array in case of an error
      });
  }, []);

  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <div className="proflie-main-div">
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0', borderBottom: '1px solid grey' }}>
        <div>
          <img
            style={{ width: '160px', height: '160px', borderRadius: '50%' }}
            src="https://images.unsplash.com/photo-1523379204-ac6d21e877f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="Profile Image"
          />
        </div>
        <div>
          <h4>{state.name}</h4>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
            <h6>{data.length} Posts</h6>
            <h6>{state.followers && state.followers.length} Followers</h6> {/* Add null check */}
            <h6>{state.followings && state.followings.length} Following</h6> {/* Add null check */}
          </div>
        </div>
      </div>
      <div className="gallery">
        {data.map(item => {
          return <img className="item" src={item.photo} key={item._id} alt={`Post ${item._id}`} />;
        })}
      </div>
      <NavLink to="/createPost">New Post</NavLink>
    </div>
  );
}
