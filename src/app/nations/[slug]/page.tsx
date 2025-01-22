"use client";
import FilmList from "@/app/components/film.list";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { slug } = useParams();

  const nation = Array.isArray(slug) ? slug[0] : slug;

  console.log(nation);

  return (
    <div>
      <FilmList nations={nation} />
    </div>
  );
}
