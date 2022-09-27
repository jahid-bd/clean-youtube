import { createStore, persist } from "easy-peasy";
import favoriteModel from "./favorite-model";
import formToggleModel from "./form-toggle-model";
import playlistModel from "./playlist-model";
import recentModel from "./recent-model";

const store = createStore({
  playlists: persist(playlistModel),
  favorites: persist(favoriteModel),
  recents: persist(recentModel),
  formToggle: formToggleModel,
});

export default store;
