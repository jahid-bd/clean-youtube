import { action } from "easy-peasy";

const recentModel = {
  recents: [],
  addToRecent: action((state, id) => {
    if (!state.recents.includes(id)) {
      if (state.recents.length > 5) {
        state.recents.pop();
      }
      state.recents.unshift(id);
    }
  }),
  removeToRecent: action((state, id) => {
    state.recents = state.recents.filter((item) => item !== id);
  }),
};

export default recentModel;
