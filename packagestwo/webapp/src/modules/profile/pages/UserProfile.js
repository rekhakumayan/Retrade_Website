"use client";

import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import ProfileTabs from "../components/ProfileTabs";
import { selectCurrentUser } from "@/modules/auth/auth.selectors";

export default function UserProfile() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-12 col-lg-7 col-xl-9">
          <ProfileCard
            name={user?.name || ""}
            customerId={user?.userId || ""}
          />
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
}
