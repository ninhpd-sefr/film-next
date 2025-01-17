"use client";

import useSWR from "swr";
import FilmList from "./components/film.list";

export default function Home() {
 

  return (
    <main>
      <div>
      <FilmList category="phim-le" />
      </div>
    </main>
  );
}
