import React from "react";
import styles from "./appContainer.module.css";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["header__container"]}>
      <div className={styles["header__container-shell"]}>
        <div className={styles["header__container-children"]}>{children}</div>
      </div>
    </div>
  );
};

export default AppContainer;
