import { createStore } from "zustand/vanilla";

export type AppState = {
  charCount: number;
  totalPages: number;
  selectedGender: string;
  selectedStatus: string;
  setCharCount: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  setSelectedGender: (selectedGender: string) => void;
  setSelectedStatus: (selectedStatus: string) => void;
};

export const initAppStore = (): AppState => ({
  charCount: 0,
  totalPages: 0,
  selectedGender: "",
  selectedStatus: "",
  setCharCount: () => {},
  setTotalPages: () => {},
  setSelectedGender: () => {},
  setSelectedStatus: () => {},
});

export const defaultAppState = initAppStore();

export const createAppStore = (initState: AppState = defaultAppState) => {
  return createStore<AppState>((set) => ({
    ...initState,
    setCharCount: (charCount) => set(() => ({ charCount })),
    setTotalPages: (totalPages) => set(() => ({ totalPages })),
    setSelectedGender: (selectedGender) => set(() => ({ selectedGender })),
    setSelectedStatus: (selectedStatus) => set(() => ({ selectedStatus })),
  }));
};
