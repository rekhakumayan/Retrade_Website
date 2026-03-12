"use client";
import React from "react";
import { TbPhotoSquareRounded } from "react-icons/tb";
import styles from "./IdentityCard.module.css"

const IdentityCard = ({ logoLink, onChange }) => {
    return (
        <div className={`card card-custom shadow-sm mb-4 ${styles.rounded} `}>
            <div className={`card-body px-4 py-4`} >
                <div className="d-flex align-items-center gap-2 mb-2">
                    <TbPhotoSquareRounded className="mb-2 fs-3 text-primary" />
                    <h4 className="section-title  fw-bold">Identity</h4>
                </div>

                <div className="mb-3">
                    <p className="form-label form-label-custom text-secondary fs-sm fw-semibold">
                        LOGO LINK
                    </p>
                    <div className={`${styles.wrapper} w-100`}>
                        <input
                            type="text"
                            value={logoLink || ""}
                            className={styles.input}
                            onChange={(e) => onChange("logoLink", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdentityCard;