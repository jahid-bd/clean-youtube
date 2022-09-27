import { Grid } from "@mui/material";
import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import VideoListItem from "../../components/VideoListItem";
import styles from "./VideoItem.module.scss";

const VideoItem = () => {
  const { videoId, playlistId } = useParams();
  const navigate = useNavigate();
  const { playlists } = useStoreState((state) => state.playlists);
  const { playlistVideos, itemCount, channelTitle } = playlists[playlistId];
  const videoItem = playlistVideos.find((item) => item.id === videoId);

  const {
    title,
    description,
    videoPublishedAt,
    position,
    videoId: id,
  } = videoItem;

  let width = "100%";
  let height = "390px";

  if (window.innerWidth < 425) {
    height = "200px";
    width = "350px";
  }

  const opts = {
    height: height,
    width: width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    event.target.playVideo();
  };

  const publisedDate = format(
    new Date(String(videoPublishedAt)),
    "LL MMM yyyy"
  );

  const { addToFavorite, removeToFavorite } = useStoreActions(
    (actions) => actions.favorites
  );
  const { favorites } = useStoreState((state) => state.favorites);

  const handleFavorite = () => {
    if (favorites.includes(playlistId)) {
      removeToFavorite(playlistId);
    } else {
      addToFavorite(playlistId);
    }
  };

  const handleOnEnd = () => {
    console.log("Ended");
    const index = playlistVideos.findIndex((item) => item.id === videoId);
    if (index - 1 < playlistVideos.length) {
      const nextVideoId = playlistVideos[index + 1].id;
      navigate(`/${playlistId}/${nextVideoId}`);
    }
  };

  return (
    <div className={styles.video_item}>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <div className={styles.video_player_section}>
            <div className={styles.player}>
              <YouTube
                videoId={id}
                opts={opts}
                onReady={onReady}
                title={title}
                onEnd={handleOnEnd}
              />
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
                  {favorites.includes(playlistId) ? (
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
                <span className={styles.video_count}>
                  {Number(position) + 1}/{itemCount} videos
                </span>
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
        <Grid item md={4}>
          <div className={styles.video_item_section}>
            {playlistVideos.map((item) => (
              <VideoListItem
                videoItem={item}
                key={item.id}
                playlistId={playlistId}
              />
            ))}
          </div>
        </Grid>
      </Grid>
      <div></div>
    </div>
  );
};

export default VideoItem;
