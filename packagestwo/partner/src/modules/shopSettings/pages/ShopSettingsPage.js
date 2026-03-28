"use client";
import { useToast } from "@/sharedComponents/Toast/useToast";
import { useDispatch, useSelector } from "react-redux";
import {
    updateShopSettings,
    setSettings,
} from "../shopSettings.module";

import IdentityCard from "../components/IdentityCard";
import ThemeEngineCard from "../components/ThemeEngineCard";
import LivePreview from "../components/LivePreview";
import Header from "@/sharedComponents/Header/Header";
import Button from "@/sharedComponents/Button/Button";
import "./ShopSettingsPage.module.css";

const ShopSettingsPage = () => {
    const dispatch = useDispatch();
    const shop = useSelector((state) => state.shop);
    const { showToast } = useToast();

    const handleChange = (field, value) => {
        dispatch(setSettings({ [field]: value }));
    };

    const handleSave = async() => {
        try{

            await dispatch(updateShopSettings(shop));

            showToast("success", "Shop settings updated successfully");
        } catch {
            showToast("error", error?.message || "Failed to update settings");
        }
    };

    return (
        <div className="container py-5">
            <div className="row g-5">
                {/* LEFT SECTION */}
                 <Header
                        title="Shop Branding"
                        subtitle="Configure your storefront visual identity"
                    />

                <div className="col-lg-5">
                   
                    <IdentityCard
                        logoLink={shop.logoLink}
                        onChange={handleChange}
                    />

                    <ThemeEngineCard
                        primaryColor={shop.primaryColor}
                        headerColor={shop.headerColor}
                        ctaColor={shop.ctaColor}
                        onChange={handleChange}
                    />

                    <Button
                        className="btn mt-2"                     
                        onClick={handleSave}
                    >
                      <span className="text-white"> Save Changes</span> 
                    </Button>
                </div>

                {/* RIGHT SECTION */}
                <div className="col-lg-7">
                    <LivePreview
                        logoLink={shop.logoLink}
                        headerColor={shop.headerColor}
                        ctaColor={shop.ctaColor}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShopSettingsPage;