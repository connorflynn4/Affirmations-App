import { create } from "zustand";

type Affirmation = {
  _id: string;
  text: string;
  isFavorite?: boolean;
};

type AffirmationsStore = {
  affirmations: Affirmation[];
  favorites: Affirmation[];
  setAffirmations: (affirmations: Affirmation[]) => void;
  toggleFavorite: (id: string) => void;
};

const useAffirmationsStore = create<AffirmationsStore>((set) => ({
  affirmations: [],
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  setAffirmations: (affirmations) =>
    set((state) => {
      // Synchronize affirmations with favorites
      const syncedAffirmations = affirmations.map((item) => ({
        ...item,
        isFavorite: state.favorites.some((fav) => fav._id === item._id),
      }));

      return { affirmations: syncedAffirmations };
    }),
  toggleFavorite: (id) =>
    set((state) => {
      const updatedAffirmations = state.affirmations.map((item) =>
        item._id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );

      const updatedFavorites = updatedAffirmations.filter((item) => item.isFavorite);

      // Persist updated favorites
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        affirmations: updatedAffirmations,
        favorites: updatedFavorites,
      };
    }),
}));

export default useAffirmationsStore;
