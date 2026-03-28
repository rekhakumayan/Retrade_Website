"use client";

import styles from "../pages/PartnerProfilePage.module.css";

export default function BusinessInfoCard({ profile }) {
  return (
    <div className={styles.card}>
      <h3>Business Information</h3>

      <label>Contact Name</label>
      <input
        className={styles.input}
        value={profile?.contactName || ""}
        disabled
      />

      <label>Business Name</label>
      <input
        className={styles.input}
        value={profile?.businessName || ""}
        disabled
      />

      <label>Email</label>
      <input
        className={styles.input}
        value={profile?.businessEmail || ""}
        disabled
      />

      <label>Commission Rate</label>
      <input
        className={styles.input}
        value={
          profile?.commissionRate !== undefined
            ? `${profile.commissionRate}%`
            : ""
        }
        disabled
      />
    </div>
  );
}