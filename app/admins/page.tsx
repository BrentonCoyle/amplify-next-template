"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";



const client = generateClient<Schema>();

export default function MoviesAdminPage() {
  const [movies, setMovies] = useState<Array<Schema["Movie"]["type"]>>([]);

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
  ]);*/
  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await client.models.Movie.list();
      setMovies(data);
    };

    fetchMovies();
  }, []);


  const handleDelete = (id: string) => {
   
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);


    // await client.models.Movie.delete({ id });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movie Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">

        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white border border-gray-200 rounded-2xl shadow p-4 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">{movie.title}</h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{movie.description}</p>
            <p className="text-sm mt-2 italic text-blue-600">Review: {movie.review}</p>
            <p className="text-sm font-medium mt-1">Score: {movie.reviewScore}/5</p>
            <p className="text-xs text-gray-400 mt-2">Movie ID: {movie.id}</p>
            
            <button onClick={() => handleDelete(movie.id)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"> Delete</button>
          </div>

          
        ))}
      </div>
    </div>
  );
}
