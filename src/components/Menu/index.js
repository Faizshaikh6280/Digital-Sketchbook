import styles from "./index.module.css";
import { FaPencil } from "react-icons/fa6";
import { BsEraserFill } from "react-icons/bs";
import { FaRotateLeft } from "react-icons/fa6";
import { FaRotateRight } from "react-icons/fa6";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/constant";
import { menuItemClick } from "@/slice/menuSlice";
import cx from "classnames";

export const Menu = () => {
  const dispatch = useDispatch();

  const activeMenuItem = useSelector((store) => store.menu.activeMenuItem);

  function hanldeMenuClick(menuItem) {
    dispatch(menuItemClick(menuItem));
  }

  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem == MENU_ITEMS.PENCIL,
        })}
        onClick={() => hanldeMenuClick(MENU_ITEMS.PENCIL)}
      >
        <FaPencil className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem == MENU_ITEMS.ERASER,
        })}
        onClick={() => hanldeMenuClick(MENU_ITEMS.ERASER)}
      >
        <BsEraserFill className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FaRotateLeft className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FaRotateRight className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <BsFileEarmarkArrowDownFill className={styles.icon} />
      </div>
    </div>
  );
};
