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
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

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

  const openMovieDetails = async (movie: Movie) => {
    setSelectedMovie(movie);
    setTrailerKey(null);

    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`);
      const data = await res.json();
      const trailer = data.results?.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
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
            <div
              key={movie.id}
              onClick={() => openMovieDetails(movie)}
              style={{
                backgroundColor: "#1f1f1f",
                borderRadius: "10px",
                overflow: "hidden",
                textAlign: "center",
                paddingBottom: "10px",
                cursor: "pointer"
              }}
            >
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

      {/* Movie Modal with YouTube Trailer */}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              position: "relative",
              color: "#fff",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer"
              }}
            >
              ✖
            </button>
            <h2 style={{ marginBottom: "10px", paddingRight: "30px" }}>{selectedMovie.title}</h2>
            <p style={{ fontSize: "14px", color: "#aaa", marginBottom: "15px" }}>
              Release Date: {selectedMovie.release_date} | Rating: ⭐ {selectedMovie.vote_average}
            </p>

            {trailerKey ? (
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: "15px" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title="Movie Trailer"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    border: "none"
                  }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img
                src={selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` : ""}
                alt={selectedMovie.title}
                style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px" }}
              />
            )}

            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>{selectedMovie.overview || "No description available."}</p>
          </div>
        </div>
      )}
    </div>
  );
}
