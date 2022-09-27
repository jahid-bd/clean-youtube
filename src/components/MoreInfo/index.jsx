import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import styles from "./MoreInfo.module.scss";

const MoreInfo = ({ id, handleFavorite }) => {
  const { favorites } = useStoreState((state) => state.favorites);
  const { removePlaylist } = useStoreActions((actions) => actions.playlists);
  const { removeToFavorite } = useStoreActions((actions) => actions.favorites);
  const { removeToRecent } = useStoreActions((actions) => actions.recents);
  const [dotTrg, setDotTrig] = useState(false);
  const ref = useRef(null);

  const handleDot = () => {
    if (dotTrg) {
      setDotTrig(false);
    } else {
      setDotTrig(true);
    }
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setDotTrig(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleRemove = () => {
    removeToRecent(id);
    removeToFavorite(id);
    removePlaylist(id);
  };

  return (
    <div className={styles.more}>
      <a className={styles.favorite} onClick={handleFavorite}>
        <i>
          {favorites.includes(id) ? (
            <MdFavorite style={{ color: "#0747a6" }} />
          ) : (
            <MdOutlineFavoriteBorder />
          )}
        </i>
      </a>
      <a className={styles.three_dot} onClick={handleDot}>
        <i>
          <TbDotsVertical />
        </i>
      </a>
      {dotTrg && (
        <div className={styles.dots_bar} ref={ref}>
          <a className={styles.remove} onClick={handleRemove}>
            <i>
              <AiFillDelete />
            </i>
            <span>Remove Playlist</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default MoreInfo;
