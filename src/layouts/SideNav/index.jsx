import { useStoreActions } from "easy-peasy";
import {
  AiOutlinePlus,
  AiOutlineQuestionCircle,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import PlaylistForm from "../../components/PlaylistFrom";
import styles from "./SideNav.module.scss";

const SideNav = ({ handleMenuBarTrig }) => {
  const { setOpen } = useStoreActions((actions) => actions.formToggle);

  return (
    <div className={styles.sidenav}>
      <div className={styles.top_content}>
        <a className={styles.menu_icon} onClick={handleMenuBarTrig}>
          <i>
            <FiMenu />
          </i>
        </a>
        <Link to={"/playlists"} className={styles.logo}>
          <i>
            <AiOutlineYoutube />
          </i>
        </Link>
        <a
          className={styles.add_icon}
          title={"Add Playlist"}
          onClick={() => setOpen()}
        >
          <i>
            <AiOutlinePlus />
          </i>
        </a>
      </div>
      <div className={styles.bottom_content}>
        <div className={styles.about} title={"About"}>
          <i>
            <AiOutlineQuestionCircle />
          </i>
        </div>
      </div>
      <PlaylistForm />
    </div>
  );
};

export default SideNav;
