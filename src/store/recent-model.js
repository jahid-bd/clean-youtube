import { action, persist } from "easy-peasy";

const recentModel = persist(
  {
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
  },
  { storage: "localStorage" }
);

export default recentModel;
