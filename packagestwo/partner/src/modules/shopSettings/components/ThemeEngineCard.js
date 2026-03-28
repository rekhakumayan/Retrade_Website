"use client";
import React from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import styles from "./ThemeEngineCard.module.css"

const ThemeEngineCard = ({
  primaryColor,
  headerColor,
  ctaColor,
  onChange,
}) => {
  return (
    <div className={`card card-custom shadow-sm mb-4 ${styles.rounded} `}>
      <div className="card-body px-4 py-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <IoColorPaletteOutline className="mb-2 fs-3 text-primary" />
          <h4 className="section-title fw-bold">Theme Engine</h4>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div >
            <h3 className="mb-0">Primary Color</h3>
            <p className="text-muted fs-sm">Accents and UI elements</p>
          </div>
          <input
            className={styles.colorPicker}
            type="color"
            value={primaryColor || '#4f46e5'}
            onChange={(e) =>
              onChange("primaryColor", e.target.value)
            }
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div >
            <h3 className="mb-0">Merchant Header</h3>
            <p className="text-muted fs-sm">Upper navigation background</p>
          </div>
          <input
            className={styles.colorPicker}
            type="color"
            value={headerColor || '#ffffff'}
            onChange={(e) =>
              onChange("headerColor", e.target.value)
            }
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div >
            <h3 className="mb-0">CTA buttons</h3>
            <p className="text-muted fs-sm">Main action buttons color</p>
          </div>
          <input
            className={styles.colorPicker}
            type="color"
            value={ctaColor || '#4f46e5'}
            onChange={(e) =>
              onChange("ctaColor", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeEngineCard;