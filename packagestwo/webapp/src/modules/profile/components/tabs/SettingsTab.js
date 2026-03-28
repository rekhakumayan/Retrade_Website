import styles from "../styles/ProfileTabs.module.css";
import { UserIcon, MailIcon } from "@/app/assets/icons/index";
import Button from "@/sharedComponents/Button/Button";
import ChevronRightIcon from "@/app/assets/icons/ChevronRightIcon";

export default function SettingsTab({ userName, userEmail, onUpdateProfile }) {
  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div className={`${styles.settingsInfoCard} p-3`}>
            <div
              className={`${styles.settingsLabel} d-flex align-items-center gap-2 mb-2`}
            >
              <UserIcon />
              <span>Full Name</span>
            </div>
            <p className={styles.settingsValue}>{userName}</p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className={`${styles.settingsInfoCard} p-3`}>
            <div
              className={`${styles.settingsLabel} d-flex align-items-center gap-2 mb-2`}
            >
              <MailIcon />
              <span>Email Address</span>
            </div>
            <p className={styles.settingsValue}>{userEmail}</p>
          </div>
        </div>
      </div>
      <Button variant="primary" onClick={onUpdateProfile}>
        Update Personal Info <ChevronRightIcon />
      </Button>
    </div>
  );
}
