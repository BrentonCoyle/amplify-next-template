"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <p>Welcome to my movie website, This will be a place where I can update and review movies into a database</p>
        
    </main>
  );
}