import React, { useEffect, useState, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { UserContext } from '../../App';

export default function UserProfile() {
  const { state, dispatch } = useContext(UserContext);
  const [showFollow, setShowFollow] = useState(true);
  const [data, setData] = useState(null);
  const { userid } = useParams();

  useEffect(() => {
    // Fetch data here
    fetch(`/user/${userid}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userid]);

  useEffect(() => {
    // Check local storage for follow status
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.followings.includes(userid)) {
      setShowFollow(false);
    }
  }, []);

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        followId: userid
      })
    })
      .then(res => res.json())
      .then(dat => {
        dispatch({ type: 'UPDATE', payload: { followings: dat.followings, followers: dat.followers } });
        setShowFollow(false);
        localStorage.setItem('user', JSON.stringify(dat));
        setData(prevState => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, dat._id]
            }
          };
        });
      });
  };

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    })
      .then(res => res.json())
      .then(dat => {
        dispatch({ type: 'UPDATE', payload: { followings: dat.followings, followers: dat.followers } });
        setShowFollow(true);
        localStorage.setItem('user', JSON.stringify(dat));
        setData(prevState => {
          const newFollower = prevState.user.followers.filter(item => item !== dat._id);
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            }
          };
        });
      });
  };
 
  return (

    <div>
      {data ? (
        <div className="profile-main-div">
          <div
          className='main-div'
            style={{ display: 'flex' }}
          >
            <div>
              <img
                style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                src="https://images.unsplash.com/photo-1523379204-ac6d21e877f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
              />
            </div>
            <div className='text-data'>
              <h4>{data.user.name}</h4>
              <h4>{data.user.email}</h4>
            </div>
          </div>
          <div style={{ display: 'block' }}>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '1% auto',
              }}
            >
              <h6>{data.posts.length} Posts</h6>
              <h6>{data.user.followers.length} Followers</h6>
              <h6>{data.user.followings.length} Following</h6>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '1% auto',
              padding: '1%',
              borderBottom: '1px solid grey',
            }}
          >
            <NavLink className="nav-links" style={{ margin: '0 3%' }} to="/">
              <button
                className="btn waves-effect-light #64b5f6 blue darken"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                Home
              </button>
            </NavLink>
            {showFollow ? (
              <button
                className="btn waves-effect-light #64b5f6 blue darken"
                onClick={followUser}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                Follow
              </button>
            ) : (
              <button
                className="btn waves-effect-light #64b5f6 blue darken"
                onClick={unfollowUser}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                Unfollow
              </button>
            )}
          </div>
          <div className="gallery">
            {data.posts.map((item) => {
              return <img className="item" src={item.photo} key={item._id} />;
            })}
          </div>
        </div>
      ) : (
        <h2>Loading.....</h2>
      )}
    </div>
  )
}