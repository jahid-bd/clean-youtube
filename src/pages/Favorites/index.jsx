import { Grid } from "@mui/material";
import { useStoreState } from "easy-peasy";
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
                sx={{ marginBottom: "10px" }}
              >
                <PlaylistCard playlist={playlist} />
              </Grid>
            ))
          ) : (
            <h3>No Playlists</h3>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Favorites;
