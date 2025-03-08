"use client";
import React from "react";
import { useCharacters } from "@/services/getCharacters";
import { useQueryState } from "nuqs";

const CharacterList = () => {
  const [page] = useQueryState("page");
  const [status] = useQueryState("status");
  const [gender] = useQueryState("gender");
  const filters = {
    page: page ? parseInt(page) : 1,
    gender,
    status,
  };
  const { isPending, isError, data, error } = useCharacters(filters);

  if (isPending)
    return (
      <div className="w-full flex justify-center items-center">Loading...</div>
    );
  if (isError)
    return (
      <div className="w-full flex justify-center items-center">
        Error: {error.message}
      </div>
    );

  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.error && (
        <div
          className={
            "flex w-full justify-center col-span-12 items-center border p-16"
          }
        >
          {data.error.message}
        </div>
      )}
      {data?.results?.map((character) => (
        <div
          key={character.id}
          className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg"
        >
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
          <div>
            <p>{character.status}</p>
            <p>{character.species}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
