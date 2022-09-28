import { action, persist } from "easy-peasy";

const favoriteModel = persist(
  {
    favorites: [],
    addToFavorite: action((state, playlistId) => {
      state.favorites.unshift(playlistId);
    }),
    removeToFavorite: action((state, playlistId) => {
      state.favorites = state.favorites.filter((item) => item !== playlistId);
    }),
  },
  { storage: "localStorage" }
);

export default favoriteModel;
