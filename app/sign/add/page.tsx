"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useState } from "react";

const client = generateClient<Schema>();

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`https://www.omdbapi.com/?apikey=49b00c58&t=${encodeURIComponent(title)}`);
    const movie = await res.json();

    await client.models.Movie.create({
      title: movie.Title,
      poster: movie.Poster,
      description: movie.Plot,
      reviewText: review,
      reviewScore: 5, // example score
    });

    setTitle("");
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
