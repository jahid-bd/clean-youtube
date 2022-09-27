import { Button, Grid } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlaylistCard from "../../components/PlaylistCard";

const Playlists = () => {
  const { playlists } = useStoreState((state) => state.playlists);
  const playlistArray = Object.values(playlists);

  const { setOpen } = useStoreActions((actions) => actions.formToggle);

  return (
    <div>
      <h1 style={{ margin: "30px 0" }}>All Playlists</h1>

      <div>
        <Grid container spacing={1}>
          {playlistArray.length > 0 ? (
            playlistArray.map((playlist) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                md={4}
                sx={{ marginBottom: "10px" }}
              >
                <PlaylistCard playlist={playlist} />
              </Grid>
            ))
          ) : (
            <div>
              <h3>No Playlist</h3>
              <Button
                variant="outlined"
                sx={{ marginTop: "10px" }}
                onClick={() => setOpen()}
              >
                Add Playlist
              </Button>
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Playlists;
