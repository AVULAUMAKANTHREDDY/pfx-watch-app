import React from 'react';
import './index.css'; 
import { useState} from "react";
import{useNavigate,Link} from "react-router-dom"
import Cookies from "js-cookie";
import { useEffect } from 'react';

const Home = ()=>{
  let navigate=useNavigate();

  const token=Cookies.get('jwt-token');
  
  useEffect(()=>{
      if(token === undefined){
          navigate("/");
      }
  })

 

  const [video, setVideo] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [generalVideos, setgeneralVideos] = useState([]);
const [gamingVideos, setgamingVideos] = useState([]);


useEffect(() => {
  fetchvideos();
  fetchTrendingVideos();
  fetchgamingVideos();
  fetchgeneralVideos();

}, []);


const fetchvideos = async () => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTM1YWRiNGU1OWQxNDg4NTNhYjYwZiIsImlhdCI6MTcwMDAyMDI2NX0.WR0B4r98bQ3lT81Kiewgah7WyRCLWqWlM6__fTHCn3A';  // Replace with your actual token
    const url = "http://localhost:4325/videos";
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    };

    const response = await fetch(url, options);

    if (response.ok) { 
      const data = await response.json();
      
      setVideo(data);
      console.log('Video data:', data);
    } else {
      
      const errorData = await response.json();
      console.error('Error fetching video:', errorData);
      setVideo("Error");
    }

  } catch (error) {
    console.error('Error fetching video:', error);
    setVideo("Error");
  }
};

const fetchTrendingVideos = async () => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTM1YWRiNGU1OWQxNDg4NTNhYjYwZiIsImlhdCI6MTcwMDAyMDI2NX0.WR0B4r98bQ3lT81Kiewgah7WyRCLWqWlM6__fTHCn3A';  // Replace with your actual token
    const url = "http://localhost:4325/videos/Trending";
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    };

    const response = await fetch(url, options);

    if (response.ok) { 
      const data = await response.json();
      
      setTrendingVideos(data);
      console.log('Trendingvideos:', data);
    } else {
      
      const errorData = await response.json();
      console.error('Error fetching video:', errorData);
      setVideo("Error");
    }

  } catch (error) {
    console.error('Error fetching video:', error);
    setVideo("Error");
  }
};

const fetchgeneralVideos = async () => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTM1YWRiNGU1OWQxNDg4NTNhYjYwZiIsImlhdCI6MTcwMDAyMDI2NX0.WR0B4r98bQ3lT81Kiewgah7WyRCLWqWlM6__fTHCn3A';  // Replace with your actual token
    const url = "http://localhost:4325/videos/general";
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    };

    const response = await fetch(url, options);

    if (response.ok) { 
      const data = await response.json();
      
      setgeneralVideos(data);
      console.log('generalvideos:', data);
    } else {
      
      const errorData = await response.json();
      console.error('Error fetching video:', errorData);
      setVideo("Error");
    }

  } catch (error) {
    console.error('Error fetching video:', error);
    setVideo("Error");
  }
};




const fetchgamingVideos = async () => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTM1YWRiNGU1OWQxNDg4NTNhYjYwZiIsImlhdCI6MTcwMDAyMDI2NX0.WR0B4r98bQ3lT81Kiewgah7WyRCLWqWlM6__fTHCn3A';  // Replace with your actual token
    const url = "http://localhost:4325/videos/gaming";
    const options = {
      headers: {
        Authorization:` Bearer ${token}`,
      },
      method: 'GET',
    };

    const response = await fetch(url, options);

    if (response.ok) { 
      const data = await response.json();
      
      setgamingVideos(data);
      console.log('Gaming videos:', data);
    } else {
      
      const errorData = await response.json();
      console.error('Error fetching video:', errorData);
      setVideo("Error");
    }

  } catch (error) {
    console.error('Error fetching video:', error);
    setVideo("Error");
  }
};




 const goToAuth =()=>{
    Cookies.remove('jwt_token')
    navigate("/login")
}






    return (


          <>
          <div className="home-container">
              <div className="responsive-container">
                  <h1>Welcome to Our Pfx-watch</h1>
                  <h2>This is the Home Page</h2>
                  <img className="logos"  src='au.jpeg' alt="logo" />
                  <button className="logout-button" onClick={goToAuth}>logout</button>
              
              </div>
              <div className="nav">
              <a href="#home">Home</a>
              <Link to ="/Trending"><a href="#">Trending</a></Link>
              <Link to ="/gaming"><a href="#">Gaming</a></Link>
              <Link to ="/saved videos"> <a href="#">Saved Videos</a></Link>
  
          </div>
          </div>
          
          </>
      )
  }
  




export default Home;


