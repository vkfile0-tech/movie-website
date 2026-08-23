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
    poster: "/poster.jpg", // Make sure this image is in your public folder
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

  // --- Fully Redesigned Mobile-First Play Screen ---
  if (selectedMovie) {
    return (
      <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif" }}>
        
        {/* 1. Header (Sticky Top) */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#000",
          padding: "10px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #333"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Back Button with Icon */}
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                backgroundColor: "transparent",
                color: "#e50914",
                border: "none",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "0 10px 0 0",
              }}
            >
              &#10005; {/* Large X icon */}
            </button>
            {/* Minimal Logo (Optional) */}
            <h1 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>MovieFlex</h1>
          </div>
          {/* Minimal Search Icon (Optional) */}
          <div style={{ fontSize: "18px", color: "#ccc" }}>&#x1F50D;</div>
        </div>

        {/* 2. Responsive Video Container (Fluid Width) */}
        <div style={{
          position: "relative",
          width: "100%",
          // Ratio 16:9 for mobile fit
          paddingTop: "56.25%", 
          backgroundColor: "#000",
          overflow: "hidden"
        }}>
          <iframe
            src={selectedMovie.driveEmbedUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              backgroundColor: "#000", // Fills any gaps
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

        {/* 3. Description & Details Container (Full Width) */}
        <div style={{ padding: "15px", textAlign: "left" }}>
          {/* Title - Large and bold for mobile */}
          <h2 style={{ fontSize: "22px", marginBottom: "8px", lineHeight: "1.3", fontWeight: "700" }}>
            {selectedMovie.title}
          }

          {/* Minimal Meta Data (Optional) */}
          <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px", display: "flex", gap: "10px" }}>
            <span>Clean Stream</span> | <span>HD 1080p</span> | <span>{new Date().getFullYear()}</span>
          </div>

          {/* Description - Cleaner text, legible size */}
          <p style={{
            fontSize: "14px",
            color: "#bbb",
            lineHeight: "1.6",
            maxHeight: "none", // Reset any previous scroll limits
            overflow: "visible"
          }}>
            {selectedMovie.description}
          </p>
        </div>

        {/* 4. Optional: "More Videos Like This" Section */}
        {/* (Can add similar video cards here later for user engagement) */}

      </div>
    );
  }

  // --- Standard Home Screen Grid View (As before) ---
  return (
    <div style={{ padding: "15px", fontFamily: "sans-serif", backgroundColor: "#141414", color: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
          <span>🎬</span> MovieFlex
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
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #333",
            backgroundColor: "#222",
            color: "#fff",
            fontSize: "14px",
            boxSizing: "border-box"
          }}
        />
      </div>

      <h2 style={{ fontSize: "18px", marginBottom: "15px", color: "#ddd" }}>Popular Videos</h2>

      {/* Grid Cards (Fluid) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "15px" }}>
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            style={{
              backgroundColor: "#1f1f1f",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out"
            }}
          >
            <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "210px", objectFit: "cover" }} />
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
