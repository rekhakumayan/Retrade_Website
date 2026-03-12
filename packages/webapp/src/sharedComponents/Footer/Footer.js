"use client";

import React from "react";
import styles from "./Footer.module.css";

const Footer = ({ onShoppingClick, onPrivacyClick, onTermsClick }) => {
  return (
    <footer className={`d-flex align-items-center ${styles.footer}`}>
      <div className="container">
        {/* Mobile → column , Desktop → row */}
        <div className="row align-items-center flex-column flex-md-row">
          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
            {/* text-xs=12.25px, fw-semibold, text-muted=#94A3B8 — all from typography */}
            <span
              className={`fw-semibold text-muted text-xs ${styles.copyright}`}
            >
              © 2024 MarketNest. Crafted for tech enthusiasts.
            </span>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-4">
              {/* text-xs=12.25px, fw-semibold from typography | color #64748B custom in module */}
              <a
                className={`fw-semibold text-xs ${styles.linkBtn}`}
                onClick={onShoppingClick}
              >
                Shopping
              </a>
              <a
                className={`fw-semibold text-xs ${styles.linkBtn}`}
                onClick={onPrivacyClick}
              >
                Privacy Policy
              </a>
              <a
                className={`fw-semibold text-xs ${styles.linkBtn}`}
                onClick={onTermsClick}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
