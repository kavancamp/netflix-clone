import React, { useState, useEffect} from 'react'
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

function Row ({ title, fetchUrl, isLargeRow }) {
   const base_url = "https://image.tmdb.org/t/p/original"; 
   const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    // snippet which runs based on specific condition/variable
    const [loading, setLoading] = useState(false);
    useEffect(() => { 
      setLoading(true);
        //if bracket is blank->run once when row loads and dont run again.
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            //if variable here, must be outside block
            setMovies(request.data.results);
            return request;
        }
        fetchData().finally(() => {
          setLoading(false);
        })
        
    }, [fetchUrl]); //dependency 

    if (loading) {
      return <p>Data is loading...</p>;
    }
    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };
    
    //when image selected display trailer from youtube(if available)
    const handleClick = (movie) => {
      if (trailerUrl) {
        setTrailerUrl('') 
      } else {
        movieTrailer(movie?.title || "")
          .then(url => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
          }).catch((error) => console.log(error));
      }
    }

  return (
    
    <div className="row">
      
      <h2>{ title }</h2>
      <div className="row__posters">
        {( movies || []).map((movie) => (
          <img
            key={movies.id} onClick={() => 
              handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} />
          ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />
        };
      </div>
    </div>
  );
}

export default Row;