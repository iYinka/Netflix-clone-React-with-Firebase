import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'


function Banner() {
  const [movie, setMovies] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      setMovies(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
      );
      return request;
    }
    fetchData();
  }, []);
  
  console.log(movie);
  
  //To truncate long texts.
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  
  
  return (
    <header
      className="banner"
      /* Backgroung image */
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center contain",
      }}
    >
      <div className="banner__contents"> 
          {/* Title  ? is called OPTIONAL CHAINING*/} 
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        
        {/* Description */}
        <h1 className="banner__description">{movie?.overview}
        {truncate(movie?.overview, 100)}
        </h1>

      </div>
      
      <div className="banner__fadeBottom"/>
    </header>
  )
}

export default Banner
