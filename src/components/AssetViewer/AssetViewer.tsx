import { useContext } from "react";
import { AssetContext } from "@/context/AssetContext";
import styles from "./assetviewer.module.scss";

export default function AssetViewer() {
  const { assetData } = useContext(AssetContext);
  const { name, status } = assetData;

  return (
    <div className={styles.viewer}>
      <div className={styles.viewer_header}>
        <h2 className={styles.viewer_title}>
          {name}
          <div
            className={`${styles.viewer_status} ${status && styles[status]}`}
          />
        </h2>
      </div>
      <div className={styles.viewer_body}>
        <h3></h3>
      </div>
    </div>
  );
}
