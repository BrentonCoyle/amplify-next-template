"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";



const client = generateClient<Schema>();

export default function MoviesPage() {
  // Comment one out when testing
  
  const [movies, setMovies] = useState<Array<Schema["Movie"]["type"]>>([]);
/* 

  const [movies, setMovies] = useState([
    {
      id: "1",
      title: "Inception",
      poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      description: "A skilled thief leads a team into people's dreams.",
      reviewText: "Mind-bending and brilliant.",
      reviewScore: 5,
    },
    {
      id: "2",
      title: "The Matrix",
      poster: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg",
      description: "A hacker discovers the reality he knows is a simulation.",
      reviewText: "Revolutionary sci-fi action.",
      reviewScore: 5,
    },
    {
      id: "3",
      title: "Interstellar",
      poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
      description: "Explorers travel through a wormhole in space to save humanity.",
      reviewText: "Visually stunning and emotionally powerful.",
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

  return (

  <div className="grid grid-cols-3  ">
    {movies.map((movie) => (
      <div key={movie.id}
        className="flex flex-col justify-center items-center"
      >
        {movie.poster && (
          <img
            src={movie.poster}
            className=""
          />
        )}
        <h2 className="text-lg font-bold text-gray-800">{movie.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{movie.description}</p>
        <p className="text-sm mt-2 text-blue-600 italic">Review: {movie.review}</p>
        <p className="text-sm font-medium mt-1">Score: {movie.reviewScore}/5</p>
      </div>
    ))}
  </div>





  );
}
