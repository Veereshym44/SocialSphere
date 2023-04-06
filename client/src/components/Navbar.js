import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';


export default function Navbar() {
  const Navigate = useNavigate();
  const sideNavRef = useRef(null);
  const { state, dispatch } = useContext(UserContext);
  const [showSocialSphere, setShowSocialSphere] = useState(false);

  useEffect(() => {
    M.Sidenav.init(sideNavRef.current);
  }, []);

  const removeLocal = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    Navigate('/login');
  };

  const RenderList = () => {
    const hideSideNav = () => {
      M.Sidenav.getInstance(sideNavRef.current).close();
    };
  
    if (state) {
      return (
        <div onClick={hideSideNav}>
        <li>
        <NavLink className="nav-links" to="/">
          Home
        </NavLink>
      </li>
          <li>
            <NavLink className="nav-links" to="/createPost">
              Create Post
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-links" to="/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <button
              className="btn waves-effect-light #64b5f6 red darken"
              onClick={removeLocal}
            >
              Logout
            </button>
          </li>
        </div>
      );
    }
    return (
      <div onClick={hideSideNav}>
        <li>
          <NavLink className="nav-links" to="/login">
            Login
          </NavLink>
        </li>

        <li>
          <NavLink className="nav-links" to="/signup">
            Signup
          </NavLink>
        </li>
      </div>
    );
  };

  const toggleSocialSphere = () => {
    setShowSocialSphere(!showSocialSphere);
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <a href="#" data-target="mobile-menu" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <a href="#" className="brand-logo left hide-on-med-and-down">
            SocialSphere
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <RenderList />
          </ul>
          <a href="#" className="brand-logo center hide-on-large-only" onClick={toggleSocialSphere}>
            SocialSphere
          </a>
        </div>
      </nav>
      <ul ref={sideNavRef} className="sidenav" id="mobile-menu">
        <RenderList />
      </ul>
      {showSocialSphere && (
        <div className="social-sphere-container" onClick={toggleSocialSphere}>
         
        </div>
      )}
    </div>
  );
}
