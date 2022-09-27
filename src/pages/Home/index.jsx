import { useStoreState } from "easy-peasy";
import Overview from "../../components/Overview";

const Home = () => {
  const { playlists } = useStoreState((state) => state.playlists);
  const { favorites } = useStoreState((state) => state.favorites);
  const { recents } = useStoreState((state) => state.recents);

  const playlistArray = Object.values(playlists);

  const favPlaylists = [];
  favorites.map((id) => {
    favPlaylists.push(playlists[id]);
  });

  const recentPlaylists = [];
  recents.map((id) => {
    recentPlaylists.push(playlists[id]);
  });

  return (
    <>
      <Overview playlists={recentPlaylists} />
      <Overview type={"playlist"} playlists={playlistArray} />
      <Overview type={"favorite"} playlists={favPlaylists} />
    </>
  );
};

export default Home;
