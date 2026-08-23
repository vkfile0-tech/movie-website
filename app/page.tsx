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
    // 100% Reliable SVG Poster (Zero link error)
    poster: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='900' viewBox='0 0 600 900'><rect width='600' height='450' fill='%230077be'/><rect y='450' height='450' width='600' fill='%2300a8e8'/><polygon points='100,480 250,300 400,480' fill='%23f4f4f4'/><rect x='150' y='450' width='200' height='180' fill='%23ffffff'/><path d='M200 450 A 50 50 0 0 1 300 450' fill='%23d90429'/><circle cx='480' cy='120' r='60' fill='%23ffb703'/></svg>",
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

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", backgroundColor: "#141414", color: "#fff", minHeight: "100vh" }}>
      
      {/* Top Header & Search Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", gap: "15px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
          🎬 MovieFlex
        </h1>

        <div style={{ display: "flex", gap: "8px", maxWidth: "400px", width: "100%" }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "6px",
              border: "1px solid #444",
              backgroundColor: "#222",
              color: "#fff",
              outline: "none"
            }}
          />
          <button
            style={{
              padding: "10px 18px",
              backgroundColor: "#e50914",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </div>
      </div>

      <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#ddd" }}>Popular Videos</h2>

      {/* Grid List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            style={{
              backgroundColor: "#1f1f1f",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              transition: "transform 0.2s"
            }}
          >
            <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "260px", objectFit: "cover" }} />
            <div style={{ padding: "12px" }}>
              <h3 style={{ fontSize: "14px", margin: 0, fontWeight: "500", lineHeight: "1.4" }}>
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "15px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "750px",
              width: "100%",
              position: "relative"
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
            <h2 style={{ marginBottom: "15px", fontSize: "18px", lineHeight: "1.3" }}>{selectedMovie.title}</h2>

            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={selectedMovie.driveEmbedUrl}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  border: "none"
                }}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>

            <p style={{ marginTop: "12px", fontSize: "13px", color: "#ccc" }}>{selectedMovie.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
