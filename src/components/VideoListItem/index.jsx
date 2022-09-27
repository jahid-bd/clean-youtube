import { useStoreActions } from "easy-peasy";
import { IoIosPlay } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import styles from "./VideoListItem.module.scss";

const VideoListItem = ({ videoItem, playlistId }) => {
  const { thumbnail, title, position, id } = videoItem;
  const { videoId } = useParams();

  const isActive = videoId === id;

  const { addToRecent } = useStoreActions((actions) => actions.recents);

  const handleAddRecent = () => {
    addToRecent(playlistId);
  };

  return (
    <Link
      to={`/${playlistId}/${id}`}
      style={{ color: "inherit" }}
      onClick={handleAddRecent}
    >
      <div
        className={styles.video_list_item}
        style={isActive ? { backgroundColor: "#ebecf0" } : null}
      >
        <div className={styles.video_num}>
          {isActive ? (
            <i>
              <IoIosPlay />
            </i>
          ) : (
            Number(position) + 1 + "."
          )}
        </div>
        <div className={styles.video_thumb}>
          <img src={thumbnail?.url} alt="" />
        </div>
        <div className={styles.video_title}>
          <span>{title}</span>
        </div>
      </div>
    </Link>
  );
};

export default VideoListItem;
