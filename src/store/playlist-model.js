import { action, thunk } from "easy-peasy";
import { toast } from "react-hot-toast";
import getPlaylist from "../service/api";

const playlistModel = {
  playlists: {},
  error: "",
  loading: false,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  addPlaylist: action((state, payload) => {
    if (!state.playlists[payload.id]) {
      state.playlists[payload.id] = payload;
      toast.success("Playlist Added Successfuly!");
    } else {
      setError("The plalist already exist!");
    }
  }),
  removePlaylist: action((state, id) => {
    delete state.playlists[id];
    toast.success("Playlist removed");
  }),
  getPlaylist: thunk(async (actions, playlistId) => {
    try {
      actions.setLoading(true);
      const data = await getPlaylist(playlistId);
      actions.addPlaylist(data);
      actions.setLoading(false);
      actions.setError(null);
    } catch (e) {
      console.log(e);
      actions.setLoading(false);
      actions.setError("Invaid playlist link or id!");
    }
  }),
};

export default playlistModel;
