'use client';

import Link from 'next/link';


export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/movies">Movies</Link>
        </li>
        <li>
          <Link href="/sign">Sign In/Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}
