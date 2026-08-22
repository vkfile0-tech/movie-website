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
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
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

  const playTrailer = async (movieId: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();
      const trailer = data.results?.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else if (data.results?.[0]?.key) {
        setTrailerKey(data.results[0].key);
      } else {
        alert("Is movie ka trailer available nahi hai!");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setTrailerKey(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="flex flex-col sm:flex-row items-center justify-between px-8 py-4 bg-gray-800 border-b border-gray-700 gap-4">
        <h1 className="text-2xl font-bold text-red-500">🎬 MovieFlex</h1>
        
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search real movies..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-72"
        />
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left max-w-6xl mx-auto">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
        </h2>

        {/* Loading Spinner / Movie Grid */}
        {loading ? (
          <p className="text-center text-gray-400 py-10">Movies load ho rahi hain...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div 
                  key={movie.id} 
                  onClick={() => {
                    setSelectedMovie(movie);
                    setTrailerKey(null);
                  }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition duration-300 cursor-pointer"
                >
                  <img 
                    src={movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                    } 
                    alt={movie.title} 
                    className="w-full h-96 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 truncate">{movie.title}</h3>
                    <p className="text-yellow-400 font-bold">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-lg col-span-full text-center py-10">
                Koi movie nahi mili! 😢
              </p>
            )}
          </div>
        )}
      </div>

      {/* Movie Details Modal Popup */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-3xl w-full p-6 relative border border-gray-700">
            <button 
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold z-10"
            >
              ✕
            </button>

            {trailerKey ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-6">
                <img 
                  src={selectedMovie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` 
                    : "https://via.placeholder.com/500x750?text=No+Poster"
                  } 
                  alt={selectedMovie.title} 
                  className="w-full sm:w-48 h-72 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedMovie.title}</h2>
                  <div className="flex gap-4 text-sm text-gray-400 mb-4">
                    <span>📅 {selectedMovie.release_date?.split("-")[0] || "N/A"}</span>
                    <span className="text-yellow-400 font-bold">⭐ {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : "N/A"}/10</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 line-clamp-5">
                    {selectedMovie.overview || "No overview available."}
                  </p>
                  <button 
                    onClick={() => playTrailer(selectedMovie.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    ▶ Watch Trailer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}