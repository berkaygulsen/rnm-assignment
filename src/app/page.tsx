import CharacterList from "@/components/List";
import CustomPagination from "../components/Pagination";
import Filters from "@/components/Filters";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <Suspense>
          <Filters />
          <CharacterList />
          <CustomPagination />
        </Suspense>
      </main>
    </div>
  );
}
