"use client";

import { useState, useEffect } from "react";

interface CustomMovie {
  id: number;
  title: string;
  poster: string;
  driveEmbedUrl: string;
  description: string;
  category?: string;
}

const myMovies: CustomMovie[] = [
  {
    id: 1,
    title: "Charming Greek seaside village with whitewashed buildings and azure sea",
    poster: "/poster.jpg",
    driveEmbedUrl: "https://drive.google.com/file/d/1UNGtaVfFUM75dIeMmVFy7GDhY9nIl1fS/preview",
    description: "Experience the idyllic beauty of a traditional Greek village nestled along the stunning blue coast, hosted completely clean from ads.",
    category: "Travel"
  },
  {
    id: 2,
    title: "Tutison API Integration with Study",
    poster: "/tutison-api.jpg",
    driveEmbedUrl: "https://drive.google.com/file/d/1mPOQ26Y59qlfmfGXsDiimwXyWBeU1CNn/preview",
    description: "Complete study session and step-by-step video tutorial on Tutison API integration.",
    category: "Education"
  }
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<CustomMovie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "history">("home");
  const [history, setHistory] = useState<CustomMovie[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("movie_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSelectMovie = (movie: CustomMovie) => {
    setSelectedMovie(movie);
    const filteredHistory = history.filter((item) => item.id !== movie.id);
    const updatedHistory = [movie, ...filteredHistory];
    setHistory(updatedHistory);
    localStorage.setItem("movie_history", JSON.stringify(updatedHistory));
  };

  const filteredMovies = myMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // WATCH PLAYER SCREEN
  if (selectedMovie) {
    const relatedMovies = myMovies.filter((m) => m.id !== selectedMovie.id);

    return (
      <div style={{ backgroundColor: "#0b0b0b", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#0b0b0b",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #222"
        }}>
          <button
            onClick={() => setSelectedMovie(null)}
            style={{
              backgroundColor: "#222",
              color: "#fff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ← Back
          </button>
          <span style={{ fontSize: "16px", fontWeight: "bold", color: "#e50914" }}>MovieFlex</span>
        </div>

        <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", backgroundColor: "#000" }}>
          <iframe
            src={selectedMovie.driveEmbedUrl}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

        <div style={{ padding: "16px" }}>
          <h1 style={{ fontSize: "18px", margin: "0 0 8px 0", lineHeight: "1.4", fontWeight: "700" }}>
            {selectedMovie.title}
          </h1>

          <p style={{ fontSize: "13px", color: "#ccc", lineHeight: "1.6", backgroundColor: "#161616", padding: "12px", borderRadius: "8px", margin: "0 0 20px 0" }}>
            {selectedMovie.description}
          </p>

          {relatedMovies.length > 0 && (
            <div>
              <h3 style={{ fontSize: "15px", marginBottom: "12px", color: "#fff", borderLeft: "3px solid #e50914", paddingLeft: "8px" }}>
                Up Next
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {relatedMovies.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectMovie(item)}
                    style={{ display: "flex", gap: "12px", backgroundColor: "#161616", borderRadius: "8px", overflow: "hidden", cursor: "pointer", padding: "8px" }}
                  >
                    <img src={item.poster} alt={item.title} style={{ width: "100px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <h4 style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#fff", lineHeight: "1.3" }}>
                        {item.title}
                      </h4>
                      <span style={{ fontSize: "10px", color: "#e50914" }}>▶ Watch Now</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // HOME DASHBOARD
  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif", backgroundColor: "#0b0b0b", color: "#fff", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "800", margin: 0, color: "#e50914" }}>MovieFlex</h1>
      </div>

      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Search movies or tutorials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "25px",
            border: "1px solid #282828",
            backgroundColor: "#161616",
            color: "#fff",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #222", paddingBottom: "10px" }}>
        <button
          onClick={() => setActiveTab("home")}
          style={{
            backgroundColor: activeTab === "home" ? "#e50914" : "transparent",
            color: "#fff",
            border: "none",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          All Videos
        </button>
        <button
          onClick={() => setActiveTab("history")}
          style={{
            backgroundColor: activeTab === "history" ? "#e50914" : "transparent",
            color: "#fff",
            border: "none",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          History ({history.length})
        </button>
      </div>

      {activeTab === "home" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "14px" }}>
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleSelectMovie(movie)}
              style={{ backgroundColor: "#161616", borderRadius: "10px", overflow: "hidden", cursor: "pointer", border: "1px solid #222" }}
            >
              <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
              <div style={{ padding: "10px" }}>
                <h3 style={{ fontSize: "12px", margin: 0, fontWeight: "600", lineHeight: "1.3" }}>
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div>
          {history.length === 0 ? (
            <p style={{ color: "#666", fontSize: "13px", textAlign: "center", marginTop: "40px" }}>
              No history yet. Play a video first!
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {history.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  style={{ display: "flex", gap: "12px", backgroundColor: "#161616", borderRadius: "8px", overflow: "hidden", cursor: "pointer", padding: "8px" }}
                >
                  <img src={movie.poster} alt={movie.title} style={{ width: "90px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h4 style={{ fontSize: "12px", margin: "0 0 4px 0", color: "#fff" }}>{movie.title}</h4>
                    <span style={{ fontSize: "10px", color: "#e50914" }}>▶ Play Again</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
