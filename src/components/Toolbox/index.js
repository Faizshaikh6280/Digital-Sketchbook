import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constant";

function Toolbox() {
  function updateBrushSize() {}
  const activeMenuItem = useSelector((store) => store.menu.activeMenuItem);
  const isShowStroke = activeMenuItem === MENU_ITEMS.PENCIL;
  const isShowBrush = activeMenuItem === MENU_ITEMS.ERASER || MENU_ITEMS.PENCIL;
  const isActive = 1;

  return (
    <div className={styles.toolboxContainer}>
      {isShowStroke && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            {Object.values(COLORS).map((el, indx) => {
              return (
                <div
                  className={`${
                    isActive === indx + 1 ? styles.activeColor : ""
                  }`} // Additional outline styles
                  key={indx}
                  style={{
                    backgroundColor: el,
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {isShowBrush && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size </h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              style={{ cursor: "pointer" }}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Toolbox;
