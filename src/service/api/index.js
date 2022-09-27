import axios from "axios";
const API_kEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const getPlaylistVideos = async (playlistId, pageToken = "", result = []) => {
  const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_kEY}&part=id,contentDetails,snippet&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);

  result = [...result, ...data.items];

  if (data.nextPageToken) {
    result = getPlaylistVideos(playlistId, data.nextPageToken, result);
  }

  return result;
};

const getPlaylist = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=id%2C%20contentDetails%2C%20snippet&id=${playlistId}&key=${API_kEY}`;

  const { data } = await axios.get(URL);

  const {
    contentDetails: { itemCount },
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { standard: thumbnail },
    },
  } = data.items[0];

  let playlistVideos = await getPlaylistVideos(playlistId);

  playlistVideos = playlistVideos.map((item) => {
    const {
      id,
      contentDetails: { videoId, videoPublishedAt },
      snippet: {
        title,
        channelId,
        channelTitle,
        description,
        position,
        thumbnails: { standard: thumbnail },
      },
    } = item;

    return {
      id,
      videoId,
      videoPublishedAt,
      title,
      channelId,
      channelTitle,
      description,
      thumbnail,
      position,
    };
  });

  return {
    id,
    title,
    description,
    thumbnail,
    itemCount,
    channelId,
    channelTitle,
    publishedAt,
    playlistVideos,
  };
};

export default getPlaylist;
