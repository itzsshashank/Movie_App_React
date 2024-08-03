import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";



const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const starsRef = useRef(null);

  useEffect(() => {
    searchMovies("Harry Potter");
    createStars();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const createStars = () => {
    const starsContainer = starsRef.current;
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      starsContainer.appendChild(star);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const stars = starsRef.current.children;
    for (let star of stars) {
      const speed = parseFloat(star.style.animationDuration);
      const yPos = (scrollY * speed / 10) % 100;
      star.style.transform = `translateY(${yPos}%)`;
    }
  };

  return (
    <div className="app">
      <div ref={starsRef} className="stars-container"></div>
      <h1>Movie Magic</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>

    
  );
};

export default App;