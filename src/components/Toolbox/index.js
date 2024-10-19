import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constant";
import { changeBrushSize, changeColor } from "@/slice/toolboxSlice";
import cx from "classnames";

function Toolbox() {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((store) => store.menu.activeMenuItem);

  const updateBrushSize = function (e) {
    dispatch(changeBrushSize({ item: activeMenuItem, size: +e.target.value }));
  };

  const updateColor = function (newColor) {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };

  const { color } = useSelector((store) => store.toolbox[activeMenuItem]);

  const isShowStroke = activeMenuItem === MENU_ITEMS.PENCIL;
  const isShowBrush = activeMenuItem === MENU_ITEMS.ERASER || MENU_ITEMS.PENCIL;

  return (
    <div className={styles.toolboxContainer}>
      {isShowStroke && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div
            className={styles.itemContainer}
            onClick={(e) => {
              updateColor(e.target.id);
            }}
          >
            {Object.values(COLORS).map((el, indx) => {
              return (
                <div
                  id={el}
                  className={cx(styles.colorBox, {
                    [styles.activeColor]: color === el,
                  })}
                  key={indx}
                  style={{
                    backgroundColor: el,
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
