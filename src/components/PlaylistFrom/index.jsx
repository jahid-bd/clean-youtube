import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";

const PlaylistForm = () => {
  const { open } = useStoreState((state) => state.formToggle);
  const { setClose } = useStoreActions((actions) => actions.formToggle);

  const [state, setState] = useState("");

  const { getPlaylist, setError } = useStoreActions(
    (actions) => actions.playlists
  );

  const { playlists, error, loading } = useStoreState(
    (state) => state.playlists
  );

  const handleSubmit = () => {
    let url = state;
    if (state.length > 34) {
      const id = state.split("list=");
      url = id[id.length - 1].trim();
    }
    if (!url || state.length < 34) {
      setError("Invalid link or Id");
    } else {
      getPlaylist(url);
      setError(null);
      url = "";
      setState("");
    }
  };

  const handleCancel = () => {
    setError(null);
    setState("");
    setClose();
  };

  const handleOnChange = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    if (!error) {
      setClose();
    }
  }, [playlists]);

  return (
    <Dialog open={open} onClose={() => setClose()} sx={{ zIndex: "99999" }}>
      <DialogTitle>Add Playlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new playlist please insert the playlist id or playlist link.
          Please make sure the link is correct. Otherwise we won't able to fetch
          the playlist information.
        </DialogContentText>
        <TextField
          margin="dense"
          label="Playlist ID or Link"
          fullWidth
          variant="standard"
          onChange={(e) => handleOnChange(e)}
          error={error}
          sx={{ marginBottom: "15px" }}
        />
        {loading && <div>Loading.....</div>}
        {error && <div style={{ color: "#d32f2f" }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setClose()}
          variant={"contained"}
          color={"error"}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant={"contained"}>
          Add Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistForm;
