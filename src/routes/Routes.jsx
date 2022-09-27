import { Route, Routes as Router } from "react-router-dom";
import Layout from "../layouts/Layout";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import NotFound from "../pages/Notfound";
import PlaylistItem from "../pages/PlaylistItem";
import Playlists from "../pages/Playlists";
import Recents from "../pages/Recents";
import VideoItem from "../pages/VideoItem";

const Routes = () => {
  return (
    <Layout>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/recents" element={<Recents />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/:playlistId" element={<PlaylistItem />} />
        <Route path="/:playlistId/:videoId" element={<VideoItem />} />
      </Router>
    </Layout>
  );
};

export default Routes;
