import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types";

interface UserStore {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null })
    }),
    {
      name: "user-storage"
    }
  )
);

export default useUserStore;
