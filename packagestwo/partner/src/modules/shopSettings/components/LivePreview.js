
"use client";

import { MdOutlineDesktopWindows } from "react-icons/md";
import SVG from "react-inlinesvg";
import styles from "./LivePreview.module.css";

const LivePreview = ({ logoLink, headerColor, ctaColor }) => {
  return (
    <div >

      <div className={styles.previewContainer}>

        {/* Preview Header */}
        <div className={styles.previewHeader}>
          <MdOutlineDesktopWindows color="#94a3b8" />
          <span className={styles.previewTitle}>LIVE PREVIEW</span>
        </div>

        {/* Phone */}
        <div className={styles.phoneWrapper}>
          <div className={styles.phoneFrame}>
            <div className={styles.phoneScreen}>
              <div
                className={styles.phoneHeader}
                style={{ backgroundColor: headerColor }}
              >
                <div className={styles.logoIcon}>
                  <SVG
                    key={logoLink}
                    src={logoLink}
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              <div className={styles.phoneBody}>
                <div className={styles.productBox}>
                  <small className="text-small">
                    PRODUCT IMAGE
                  </small>
                </div>

                <div className={styles.placeholderText}></div>
                <div
                  className={`${styles.placeholderText} ${styles.placeholderShort}`}
                ></div>

                <button
                  className={styles.ctaButton}
                  style={{ backgroundColor: ctaColor }}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LivePreview;