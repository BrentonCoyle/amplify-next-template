"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useState } from "react";

const client = generateClient<Schema>();

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [spoilerReview, setSpoilerReview] = useState("");
  const [reviewScore, setReviewScore] = useState<number | undefined>(undefined);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reviewScore === undefined || reviewScore < 1 || reviewScore > 5) {
      alert("Review score must be a number between 1 and 5.");
      return;
    }

    const res = await fetch(`https://www.omdbapi.com/?apikey=49b00c58&t=${encodeURIComponent(title)}`);
    const movie = await res.json();

    const newMovie = {
      title: movie.Title,
      poster: movie.Poster,
      type: movie.Type,
      description: movie.Plot,
      review,
      spoilerReview,
      reviewScore: reviewScore?? 0,
    };


    console.log("Submitting movie:", newMovie);

    await client.models.Movie.create(newMovie);
  
    setTitle("");
    setReview("");
    setSpoilerReview("");
    setReviewScore(0);
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto p-6 bg-white rounded-xl">

    <h2 className="text-[40px] font-bold text-gray-800 text-center mb-4">Add a Movie</h2>


      <div className="space-y-2">
        <label className="text-[20px] font-large text-gray-700">Movie Title</label>
        <input
          type="text"
          placeholder="e.g. The Matrix"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-[15px] w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[20px] font-medium text-gray-700">Review</label>
        <textarea
          placeholder="Your thoughts..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="text-[15px] w-full px-4 py-2 border border-gray-300 rounded-md "
        />
      </div>

      <div className="space-y-2">
        <label className="text-[20px] font-medium text-gray-700">Spoiler Review</label>
        <textarea
          placeholder="Spoilers ahead..."
          value={spoilerReview}
          onChange={(e) => setSpoilerReview(e.target.value)}
          className="text-[15px] w-full px-4 py-2 border border-gray-300 rounded-md "
        />
      </div>

      <div className="space-y-2">
        <label className="text-[20px] font-medium text-gray-700">Review Score (1–5)</label>
        <input
          type="number"
          value={reviewScore ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setReviewScore(value === "" ? undefined : parseInt(value));
          }}
          className="text-[15px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
  type="submit"
  className="w-full bg-[#6358c7] text-[white] font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-[#4e46b6] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#6358c7] active:bg-[#3c3494] active:scale-95"
>
  Submit Movie
</button>



    </form>
  );
}
