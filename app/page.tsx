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
    title: "My First Movie",
    poster: "https://images.pexels.com/photos/3829965/pexels-photo-3829965.jpeg?auto=compress&cs=tinysrgb&w=600",
    driveEmbedUrl: "https://drive.google.com/file/d/1UNGtaVfFUM75dIeMmVFy7GDhY9nIl1fS/preview",
    description: "Enjoy watching in HD quality with zero ads."
  }
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<CustomMovie | null>(null);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", backgroundColor: "#141414", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        🎬 MovieFlex
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
        {myMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            style={{
              backgroundColor: "#1f1f1f",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              textAlign: "center",
              paddingBottom: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
            }}
          >
            <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
            <h3 style={{ fontSize: "15px", marginTop: "10px", padding: "0 5px" }}>{movie.title}</h3>
          </div>
        ))}
      </div>

      {/* Clean Player Modal */}
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
            <h2 style={{ marginBottom: "15px" }}>{selectedMovie.title}</h2>

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
