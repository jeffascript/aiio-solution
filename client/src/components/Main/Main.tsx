import React from "react";
import styles from "@/components/Main/AppContainer.module.css";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["header__container"]}>
      <div className={styles["header__container-shell"]}>
        <div className={styles["header__container-children"]}>{children}</div>
      </div>
    </div>
  );
};

export default Main;
