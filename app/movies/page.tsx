"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function MoviesPage() {
  const [movies, setMovies] = useState<Array<Schema["Movie"]["type"]>>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await client.models.Movie.list();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p>{movie.description}</p>
            {movie.poster && (
              <img src={movie.poster} className="mt-2 w-40" />
            )}
            <p className="mt-1 italic text-sm">Review: {movie.reviewText}</p>
            <p>Score: {movie.reviewScore}/5</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
