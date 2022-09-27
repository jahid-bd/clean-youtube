import { useStoreActions, useStoreState } from "easy-peasy";
import { IoIosPlay } from "react-icons/io";
import { MdPlaylistPlay } from "react-icons/md";
import { Link } from "react-router-dom";

import MoreInfo from "../MoreInfo";
import styles from "./PlaylistCard.module.scss";

const PlaylistCard = ({ playlist }) => {
  const { title, thumbnail, itemCount, id, playlistVideos } = playlist;
  const { addToFavorite, removeToFavorite } = useStoreActions(
    (actions) => actions.favorites
  );
  const { favorites } = useStoreState((state) => state.favorites);
  const handleFavorite = () => {
    if (favorites.includes(id)) {
      removeToFavorite(id);
    } else {
      addToFavorite(id);
    }
  };
  const { addToRecent } = useStoreActions((actions) => actions.recents);
  const handleAddRecent = () => {
    addToRecent(id);
  };

  const { id: firstVideoId } = playlistVideos[0];
  return (
    <div className={styles.playlist_card}>
      <Link to={`/${id}/${firstVideoId}`} onClick={handleAddRecent}>
        <div className={styles.thumbnail}>
          <div className={styles.image}>
            <img src={thumbnail.url} alt={title} />
          </div>
          <div className={styles.overinfo}>
            <span className={styles.video_amount}>{itemCount}</span>
            <i>
              <MdPlaylistPlay />
            </i>
          </div>
          <div className={styles.play_all}>
            <div className={styles.contents}>
              <i>
                <IoIosPlay />
              </i>
              <span>Play All</span>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.info}>
        <div className={styles.title}>
          <span>{title.length > 50 ? title.substr(0, 50) + "..." : title}</span>
        </div>
        <div className={styles.options}>
          <div className={styles.view_link}>
            <Link to={`/${id}`}>View Full Playlist</Link>
          </div>
          <MoreInfo id={id} handleFavorite={handleFavorite} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
