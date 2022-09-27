import { action } from "easy-peasy";

const favoriteModel = {
  favorites: [],
  addToFavorite: action((state, playlistId) => {
    state.favorites.unshift(playlistId);
  }),
  removeToFavorite: action((state, playlistId) => {
    state.favorites = state.favorites.filter((item) => item !== playlistId);
  }),
};

export default favoriteModel;
