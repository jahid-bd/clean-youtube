import { Grid } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import NoPlaylist from "../../components/NoPlaylist";
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
                xl={2}
                sx={{ marginBottom: "10px" }}
                key={playlist.id}
              >
                <PlaylistCard playlist={playlist} />
              </Grid>
            ))
          ) : (
            <NoPlaylist type={"playlist"} setOpen={setOpen} />
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Playlists;
