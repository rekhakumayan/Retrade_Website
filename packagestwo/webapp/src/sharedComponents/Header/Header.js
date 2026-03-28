"use client";

import React from "react";
import styles from "./Header.module.css";
import SVG from "react-inlinesvg";
import StoreIcon from "../../app/assets/icons/storeIcon";
import ShoppingBagIcon from "../../app/assets/icons/shoppingBagIcon";
import Button from "@/sharedComponents/Button/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { logout, setUser, setToken } from "@/modules/auth/auth.module";
import { getCart } from "@/modules/cart/cart.module";
import Search from "../../modules/products/components/Searching";
import { usePathname } from "next/navigation";
import { getProducts } from "@/modules/products/products.module";


const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.count);

  useEffect(() => {
    if (pathname === "/products") {

      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      router.replace(`/products?${params.toString()}`);
    }
  }, [searchTerm, pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
    }
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/products");
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={`row align-items-center ${styles.headerRow}`}>
          <div className="col-3">
            <div className={`d-flex align-items-center ${styles.logoGroup}`}
              onClick={() => router.push("/products")}
            >
              <div
                className={`d-flex align-items-center justify-content-center ${styles.logoIcon}`}
              >
                <StoreIcon size={16} strokeWidth={2} />
              </div>
              <span className={`fw-bold h6 ${styles.logoText}`}>
                Retrade
              </span>
            </div>
          </div>

          <div className="col-6 d-flex justify-content-center align-items-center">
            {pathname === "/products" && (
              <Search 
                onSearch={setSearchTerm} 
                searchTerm={searchTerm}
              />
            )}
          </div>

          <div className="col-3">
            <div
              className={`d-flex align-items-center justify-content-end ${styles.actionsRow}`}
            >
              <div className={` ${styles.cartWrapper}`}>
                <button
                  className={`d-flex align-items-center justify-content-center text-secondary me-3 ${styles.cartBtn}`}
                  onClick={() => router.push("/cart")}
                  aria-label="Cart"
                >
                  <ShoppingBagIcon size={20} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span
                      className={`d-flex align-items-center justify-content-center ${styles.cartBadge}`}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              {user ? (
                <div className="dropdown">
                  <button
                    className={`btn p-0 border-0 bg-transparent ${styles.profileBtn}`}
                    data-bs-toggle="dropdown"
                  >
                    <SVG
                      src="/assets/svg/circle-user.svg"
                      className="text-secondary me-1"
                    />
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item fw-bold"
                        onClick={() => router.push("/profile")}
                      >
                        My Profile
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item fw-bold"
                        onClick={() => router.push("/profile")}
                      >
                        Orders
                      </button>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger fw-bold"
                        onClick={handleLogout}
                      >
                        <SVG
                          src="/assets/svg/log-out.svg"
                          className="text danger me-1"
                        />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Button
                  onClick={() => router.push("/signin")}
                  variant="primary"
                  pill
                  className={styles.loginBtn}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
