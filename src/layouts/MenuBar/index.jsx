import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineFavoriteBorder,
  MdOutlineWatchLater,
  MdPlaylistPlay,
} from "react-icons/md";
import { Link, useMatch } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./MenuBar.module.scss";

const MenuBar = ({ menuBarTrig }) => {
  return (
    <div
      className={styles.menubar}
      style={
        !menuBarTrig ? { left: "-220px", transform: "translateX(100)" } : null
      }
    >
      <Link to={"/"}>
        {" "}
        <div className={styles.logo}>
          <img src={logo} alt="" width={40} height={40} />
          <span>Clean YouTube</span>
        </div>
      </Link>
      <div className={styles.menu}>
        <ul>
          <Link
            to={"/"}
            className={Boolean(useMatch("/")) ? styles.active : null}
          >
            <i>
              <AiOutlineHome />
            </i>
            <span>Home</span>
          </Link>

          <li>
            <Link
              to={"/recents"}
              className={Boolean(useMatch("/recents")) ? styles.active : null}
            >
              <i>
                <MdOutlineWatchLater />
              </i>
              <span>Recents</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/playlists"}
              className={Boolean(useMatch("/playlists")) ? styles.active : null}
            >
              <i>
                <MdPlaylistPlay />
              </i>
              <span>Playlists</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/favorites"}
              className={Boolean(useMatch("/favorites")) ? styles.active : null}
            >
              <i>
                <MdOutlineFavoriteBorder />
              </i>
              <span>Favorites</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
