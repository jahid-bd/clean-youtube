import { action, persist, thunk } from "easy-peasy";
import { toast } from "react-hot-toast";
import getPlaylist from "../service/api";

const playlistModel = persist(
  {
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
      if (Object.keys(state.playlists).length > 20) {
        state.error = "You can add max 20 playlists";
        return;
      }
      if (!state.playlists[payload.id]) {
        state.playlists[payload.id] = payload;
        toast.success("Playlist Added Successfuly!");
      } else {
        state.error = "The plalist already exist!";
        throw new Error();
      }
    }),
    removePlaylist: action((state, id) => {
      delete state.playlists[id];
      toast.error("Playlist removed");
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
  },
  {
    storage: "localStorage",
  }
);

export default playlistModel;
