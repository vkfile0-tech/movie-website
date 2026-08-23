"use client";

import { useState } from "react";

interface CustomMovie {
  id: number;
  title: string;
  poster: string;
  driveEmbedUrl: string;
  description: string;
}

const myMovies: CustomMovie[] = [
  {
    id: 1,
    title: "Charming Greek seaside village with whitewashed buildings and azure sea",
    poster: "/poster.jpg",
    driveEmbedUrl: "https://drive.google.com/file/d/1UNGtaVfFUM75dIeMmVFy7GDhY9nIl1fS/preview",
    description: "Experience the idyllic beauty of a traditional Greek village nestled along the stunning blue coast, hosted completely clean from ads."
  }
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<CustomMovie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = myMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dedicated Watch Screen View
  if (selectedMovie) {
    return (
      <div style={{ backgroundColor: "#141414", minHeight: "100vh", color: "#fff", padding: "15px" }}>
        {/* Back Button */}
        <button
          onClick={() => setSelectedMovie(null)}
          style={{
            backgroundColor: "#e50914",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "15px",
            fontSize: "14px"
          }}
        >
          ← Back to Movies
        </button>

        <h1 style={{ fontSize: "18px", marginBottom: "12px", lineHeight: "1.4" }}>
          {selectedMovie.title}
        </h1>

        {/* Responsive Mobile Video Container */}
        <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", backgroundColor: "#000", borderRadius: "10px", overflow: "hidden" }}>
          <iframe
            src={selectedMovie.driveEmbedUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none"
            }}
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#aaa", lineHeight: "1.5" }}>
          {selectedMovie.description}
        </p>
      </div>
    );
  }

  // Home Screen Grid View
  return (
    <div style={{ padding: "15px", fontFamily: "sans-serif", backgroundColor: "#141414", color: "#fff", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          🎬 MovieFlex
        </h1>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: "#222",
            color: "#fff",
            fontSize: "14px",
            boxSizing: "border-box"
          }}
        />
      </div>

      <h2 style={{ fontSize: "18px", marginBottom: "15px", color: "#ddd" }}>Popular Videos</h2>

      {/* Grid Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "15px" }}>
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            style={{
              backgroundColor: "#1f1f1f",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer"
            }}
          >
            <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "10px" }}>
              <h3 style={{ fontSize: "13px", margin: 0, fontWeight: "500", lineHeight: "1.3" }}>
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
