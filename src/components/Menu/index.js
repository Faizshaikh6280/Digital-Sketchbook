import styles from "./index.module.css";
import { FaPencil } from "react-icons/fa6";
import { BsEraserFill } from "react-icons/bs";
import { FaRotateLeft } from "react-icons/fa6";
import { FaRotateRight } from "react-icons/fa6";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";

export const Menu = () => {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.iconWrapper}>
        <FaPencil className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
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
