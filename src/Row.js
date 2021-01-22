import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.css';
import movieTrailer from 'movie-trailer';


const base_url = "http://image.tmdb.org/t/p/original/"




function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  //useEffect runs based on specific conditions/variables
   //if [] is left blank, run once when the row loads and don't run again
  //but [movies] means row loading is dependent on movie change.
  
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      
      return request;
      
      // console.log(request.data.results);
      // console.table(request.data.results);

    }  
    fetchData();
  }, [fetchUrl]);
  
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters...
      autoplay: 1,
    },
  };
  
  
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
              /* To find the param in the youtube trailer url say:
                https://www.youtube.com/watch?v=XtMyhUnkknO    param=v where v is XtMyhUnkknO */
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get("v"));
          })
        .catch ((error) => console.log(error));
    }
  }
  
  return (
    <div className="row">
      {/* Title */}
      <h2>{title}</h2>
      
      <div className="row__posters">
        {/* MOVIES POSTERS */}
        
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} />
        ))}
        
      </div>
      {/* Container--->posters */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
