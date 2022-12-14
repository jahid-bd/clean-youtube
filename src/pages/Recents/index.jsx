import { Grid } from "@mui/material";
import { useStoreState } from "easy-peasy";
import NoPlaylist from "../../components/NoPlaylist";
import PlaylistCard from "../../components/PlaylistCard";

const Recents = () => {
  const { recents } = useStoreState((state) => state.recents);
  const { playlists } = useStoreState((state) => state.playlists);
  const recentPlaylists = [];
  recents?.map((id) => {
    recentPlaylists.push(playlists[id]);
  });
  return (
    <div>
      <h1 style={{ margin: "30px 0" }}>Recent Playlists</h1>
      <div>
        <Grid container spacing={1} sx={{ marginBottom: "10px" }}>
          {recentPlaylists.length > 0 ? (
            recentPlaylists.map((playlist) => (
              <Grid item xs={12} sm={6} lg={3} md={4} xl={2} key={playlist.id}>
                <PlaylistCard playlist={playlist} />
              </Grid>
            ))
          ) : (
            <NoPlaylist />
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Recents;
