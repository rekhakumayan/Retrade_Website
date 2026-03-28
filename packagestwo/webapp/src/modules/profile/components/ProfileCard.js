import styles from "./styles/ProfileCard.module.css";
import ShieldCheckIcon from "@/app/assets/icons/ShieldCheckIcon";

export default function ProfileCard({ name, customerId }) {
  const initial = name?.charAt(0).toUpperCase() || "U";
  return (
    <div className={`${styles.profileCard} p-4 mb-4`}>
      <div className="d-flex align-items-center gap-3">
        <div
          className={`${styles.avatar} d-flex align-items-center justify-content-center fw-bold flex-shrink-0`}
        >
          {initial}
        </div>
        <div>
          <h1 className={styles.profileName}>{name}</h1>
          <div className="d-flex align-items-center flex-wrap gap-2 mt-1">
            <span className={styles.customerId}>Customer ID: {customerId}</span>
            <span className={styles.metaDot} />
            <span
              className={`${styles.verifiedBadge} d-inline-flex align-items-center gap-1`}
            >
              <ShieldCheckIcon />
              Verified Member
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
