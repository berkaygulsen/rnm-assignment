import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/app-store-provider";

type Filters = {
  page?: number | null;
  gender?: string | null;
  status?: string | null;
};

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

interface Response {
  results?: Character[];
  info?: Info;
  error?: {
    message: string;
  };
}

const getCharacters = async (
  {
    queryKey,
  }: {
    queryKey: [string, Filters];
  },
  setTotalPages: (totalPages: number) => void,
  setCharCount: (charCount: number) => void,
): Promise<Response> => {
  const [, filters] = queryKey ? queryKey : [];
  const url = new URL("https://rickandmortyapi.com/api/character/");
  if (filters) {
    if (filters.page) url.searchParams.append("page", filters.page.toString());
    if (filters.gender) url.searchParams.append("gender", filters.gender);
    if (filters.status) url.searchParams.append("status", filters.status);
  }

  const response = await fetch(url.toString());
  const result = await response.json();
  if (result.error) {
    setTotalPages(0);
    setCharCount(0);
    return {
      error: {
        message: result.error,
      },
    };
  }
  setTotalPages(result.info.pages);
  setCharCount(result.info.count);

  return result;
};

export const useCharacters = (filters: Filters) => {
  const { setTotalPages, setCharCount, selectedGender, selectedStatus } =
    useAppStore((state) => state);
  const newFilters = {
    ...filters,
    status: selectedStatus === "all" ? null : selectedStatus,
    gender: selectedGender === "all" ? null : selectedGender,
  };
  return useQuery({
    queryKey: ["characters", newFilters] as [string, Filters],
    queryFn: (params) => getCharacters(params, setTotalPages, setCharCount),
  });
};
