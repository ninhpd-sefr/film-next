"use client";
import FilmList from "@/app/components/film.list";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { slug } = useParams();

  const genre = Array.isArray(slug) ? slug[0] : slug;

  console.log(genre);

  return (
    <div>
      <FilmList genres={genre} />
    </div>
  );
}
