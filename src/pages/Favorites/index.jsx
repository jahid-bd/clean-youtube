import { Grid } from "@mui/material";
import { useStoreState } from "easy-peasy";
import NoPlaylist from "../../components/NoPlaylist";
import PlaylistCard from "../../components/PlaylistCard";

const Favorites = () => {
  const { playlists } = useStoreState((state) => state.playlists);
  const { favorites } = useStoreState((state) => state.favorites);
  const favPlaylists = [];
  favorites?.map((id) => {
    favPlaylists.push(playlists[id]);
  });
  return (
    <div>
      <h1 style={{ margin: "30px 0" }}>Favourite Playlists</h1>

      <div>
        <Grid container spacing={1}>
          {favPlaylists.length > 0 ? (
            favPlaylists.map((playlist) => (
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
            <NoPlaylist />
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Favorites;
