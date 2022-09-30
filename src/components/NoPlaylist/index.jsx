import { Button } from "@mui/material";
import styles from "./NoPlaylist.module.scss";

const NoPlaylist = ({ type, setOpen }) => {
  return (
    <div className={styles.no_playlist}>
      <p>No Playlists</p>
      {type === "playlist" && (
        <Button
          variant="outlined"
          sx={{ marginTop: "10px" }}
          onClick={() => setOpen()}
        >
          Add Playlist
        </Button>
      )}
    </div>
  );
};

export default NoPlaylist;
