"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "@/modules/auth/auth.module";
import { useRouter } from "next/navigation";
export default function Sidebar() {
  const dispatch=useDispatch();
  const router=useRouter()
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "bi-ui-checks-grid" },
    { href: "/products", label: "Products", icon: "bi-box-seam" },
    { href: "/categories", label: "Categories", icon: "bi-stack" },
    { href: "/orders", label: "Orders", icon: "bi-cart2" },
    { href: "/customers", label: "Customers", icon: "bi-people" },
    { href: "/settings", label: "Shop Settings", icon: "bi-gear" },
  ];

  const handleLogout=async()=>{
     await dispatch(logoutUser())
     router.push("/")
  }

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <p className={styles.sectionTitle}>CORE TOOLS</p>

        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <i className={`bi ${item.icon} ${styles.icon}`}></i>
              <span>{item.label}</span>
              {isActive && <span className={styles.activeDot}></span>}
            </Link>
          );
        })}

        <p className={styles.sectionTitle}>SYSTEM</p>

        <div onClick={handleLogout} className={styles.navItem}>
          <i className={`bi bi-box-arrow-right ${styles.icon}`}></i>
          <span>Logout</span>
        </div>
      </nav>
    </aside>
  );
}