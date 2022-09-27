import { action } from "easy-peasy";

const formToggleModel = {
  open: false,
  setOpen: action((state) => {
    state.open = true;
  }),
  setClose: action((state) => {
    state.open = false;
  }),
};

export default formToggleModel;
