"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function MoviesDetailPage({ params }: { params: { id: string } }) {
  const [movies, setMovies] = useState<Array<Schema["Movie"]["type"]>>([]);
  const movieId = params.id;

  /** 
  const [movies, setMovies] = useState([
    {
      id: "1",
      title: "Inception",
      poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      description: "A skilled thief leads a team into people's dreams.",
      review: "Mind-bending and brilliant.",
      reviewScore: 5,
    },
    {
      id: "2",
      title: "The Matrix",
      poster: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg",
      description: "A hacker discovers the reality he knows is a simulation.",
      review: "Revolutionary sci-fi action.",
      reviewScore: 5,
    },
    {
      id: "3",
      title: "Interstellar",
      poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
      description: "Explorers travel through a wormhole in space to save humanity.",
      review: "Visually stunning and emotionally powerful.",
      reviewScore: 4,
    },
  ]);
  */

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await client.models.Movie.list();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="flex flex-row justify-between items-center w-full max-w-4xl mx-auto p-4 gap-8">
      {/* Text on the left */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800">{movie.title}</h2>
        <p className="text-base text-gray-600 mt-1">{movie.description}</p>
        <p className="text-base mt-2 text-blue-600 italic">Review: {movie.review}</p>
        <p className="text-base font-medium mt-1">Score: {movie.reviewScore}/5</p>
        <p className="text-sm text-gray-400 mt-2">Movie ID: {movie.id}</p>
      </div>

      {/* Image on the right */}
      {movie.poster && (
        <div className="flex-shrink-0">
          <img src={movie.poster} className="w-64 rounded shadow"  />
        </div>
      )}
    </div>
  );
}
