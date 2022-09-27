import { Grid } from "@mui/material";
import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IoIosPlay } from "react-icons/io";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import VideoListItem from "../../components/VideoListItem";
import styles from "./PLaylistItem.module.scss";

const PlaylistItem = () => {
  const { playlists } = useStoreState((state) => state.playlists);
  const { playlistId } = useParams();

  const playlist = playlists[playlistId];

  if (!playlist) return;

  const {
    id,
    title,
    description,
    thumbnail,
    publishedAt,
    itemCount,
    playlistVideos,
    chanelId,
    channelTitle,
  } = playlist;

  const { id: firstVideoId } = playlistVideos[0];

  const publisedDate = format(new Date(String(publishedAt)), "LL MMM yyyy");

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

  return (
    <div className={styles.playlist_item}>
      <Grid container spacing={3}>
        <Grid item md={5}>
          <div className={styles.playlist_cover_section}>
            <div className={styles.cover}>
              <img src={thumbnail.url} alt="" />
              <Link
                to={`/${playlistId}/${firstVideoId}`}
                onClick={handleAddRecent}
              >
                <div className={styles.overlap}>
                  <div className={styles.text}>
                    <i>
                      <IoIosPlay />
                    </i>
                    <span>Play All</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className={styles.details}>
              <div className={styles.title}>{title}</div>

              <div className={styles.fav_chan}>
                <div className={styles.channel}>
                  <a
                    href={`https://www.youtube.com/c/${channelTitle
                      .split(" ")
                      .join("")}`}
                    target={"_blank"}
                  >
                    {channelTitle}
                  </a>
                </div>
                <div className={styles.fav} onClick={handleFavorite}>
                  {favorites.includes(id) ? (
                    <i style={{ color: "#0747a6" }}>
                      <MdFavorite />
                    </i>
                  ) : (
                    <i>
                      <MdOutlineFavoriteBorder />
                    </i>
                  )}
                </div>
              </div>

              <div className={styles.info}>
                <span className={styles.video_count}>{itemCount} videos</span>
                <span className={styles.published}>
                  <span>Uploaded:</span> {publisedDate}
                </span>
              </div>
              {description.length && (
                <div className={styles.description}>
                  <span>Description:</span>
                  <p>{description}</p>
                </div>
              )}
            </div>
          </div>
        </Grid>
        <Grid item md={7}>
          <div className={styles.playlist_video_section}>
            {playlistVideos.map((item) => (
              <VideoListItem videoItem={item} key={item.id} playlistId={id} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlaylistItem;
