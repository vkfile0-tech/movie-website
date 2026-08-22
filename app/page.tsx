"use client";

import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

const API_KEY = "98093b25e022c8926480ebac8d55f2ea";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (query = "") => {
    setLoading(true);
    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies(searchQuery);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", backgroundColor: "#141414", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>🎬 MovieFlex</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="Search real movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "6px",
            border: "none",
            width: "280px",
            fontSize: "15px",
            color: "#000",
            outline: "none"
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 18px",
            backgroundColor: "#e50914",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Search
        </button>
      </form>

      <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>Popular Movies</h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
          {movies.map((movie) => (
            <div key={movie.id} style={{ backgroundColor: "#1f1f1f", borderRadius: "10px", overflow: "hidden", textAlign: "center", paddingBottom: "10px" }}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
                alt={movie.title}
                style={{ width: "100%", height: "260px", objectFit: "cover" }}
              />
              <h3 style={{ fontSize: "14px", margin: "10px 5px 5px 5px" }}>{movie.title}</h3>
              <p style={{ fontSize: "12px", color: "#aaa" }}>⭐ {movie.vote_average}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
