"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopSettings } from "@/modules/shopSettings/shopSettings.module";

export default function ThemeLoader() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const {
    primaryColor,
    headerColor,
    ctaColor,
  } = useSelector((state) => state.shop);

  
  useEffect(() => {
    dispatch(fetchShopSettings());
  }, [dispatch,token]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      primaryColor
    );

    document.documentElement.style.setProperty(
      "--color-header",
      headerColor
    );

    document.documentElement.style.setProperty(
      "--color-cta",
      ctaColor
    );
  }, [primaryColor, headerColor, ctaColor]);

  return null;
}