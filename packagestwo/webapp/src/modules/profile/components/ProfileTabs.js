"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/ProfileTabs.module.css";
import { PackageIcon, MapPinIcon, UserIcon } from "@/app/assets/icons/index";
import AddAddressModal from "./AddAddressModal";
import UpdateProfileModal from "./UpdateProfileModal";
import OrdersTab from "./tabs/OrdersTab";
import AddressesTab from "./tabs/AddressesTab";
import SettingsTab from "./tabs/SettingsTab";
import OrderDetailModal from "./orders/OrderDetailModal";
import {
  fetchUser,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/modules/user/user.module";
import {
  selectUserAddresses,
  selectUserLoading,
} from "@/modules/user/user.selectors";
import { selectCurrentUser } from "@/modules/auth/auth.selectors";
import { fetchOrders } from "@/modules/orders/order.module";
import {
  selectOrderList,
  selectOrderLoading,
  selectOrderCurrentPage,
  selectOrderTotalPages,
  selectOrderTotalDocs,
} from "@/modules/orders/order.selector";

const TABS = [
  { id: "orders", label: "Order History", Icon: PackageIcon },
  { id: "addresses", label: "Addresses", Icon: MapPinIcon },
  { id: "settings", label: "My Settings", Icon: UserIcon },
];

export default function ProfileTabs() {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const addresses = useSelector(selectUserAddresses);
  const userLoading = useSelector(selectUserLoading);
  const orders = useSelector(selectOrderList);
  const orderLoading = useSelector(selectOrderLoading);
  const totalPages = useSelector(selectOrderTotalPages);
  const currentPage = useSelector(selectOrderCurrentPage);
  const totalDocs = useSelector(selectOrderTotalDocs);

  const userId = user?.userId;
  const userName = user?.name || "";
  const userEmail = user?.email || "";

  const [activeTab, setActiveTab] = useState("orders");
  const [showAddrModal, setShowAddrModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId && activeTab === "orders") {
      dispatch(fetchOrders({ userId, page: 1 }));
    }
  }, [userId, activeTab, dispatch]);

  const handleSaveAddress = async (formData) => {
    const payload = {
      tag: formData.tag,
      houseNo: formData.houseNo,
      street: formData.street,
      city: formData.city,
      pincode: formData.pincode,
      country: formData.country,
    };
    if (editingAddress) {
      await dispatch(
        updateAddress({ userId, addressId: editingAddress._id, payload }),
      );
    } else {
      await dispatch(addAddress({ userId, payload }));
    }

    await dispatch(fetchUser(userId));

    setShowAddrModal(false);
    setEditingAddress(null);
  };

  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setShowAddrModal(true);
  };
  const handleDelete = (addressId) =>
    dispatch(deleteAddress({ userId, addressId }));
  const handleSetDefault = (addressId) =>
    dispatch(setDefaultAddress({ userId, addressId }));
  const handleAddNew = () => {
    setEditingAddress(null);
    setShowAddrModal(true);
  };

  const handlePrev = () => {
    if (currentPage > 1)
      dispatch(fetchOrders({ userId, page: currentPage - 1 }));
  };
  const handleNext = () => {
    if (currentPage < totalPages)
      dispatch(fetchOrders({ userId, page: currentPage + 1 }));
  };

  const handleViewDetails = (orderId) => setSelectedOrderId(orderId);
  const handleCloseDetails = () => setSelectedOrderId(null);

  return (
    <div className={styles.lowerSection}>
      {/* Tab Bar */}
      <div className="d-flex align-items-stretch border-bottom px-2">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={`${styles.tabBtn} d-inline-flex align-items-center gap-2 ${activeTab === id ? styles.tabActive : "text-muted"}`}
            onClick={() => setActiveTab(id)}
          >
            <span className={styles.tabIcon}>
              <Icon />
            </span>
            <span className={styles.tabLabel}>{label}</span>
            {activeTab === id && <div className={styles.tabIndicator} />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`${styles.tabDash} d-flex flex-column`}>
        {activeTab === "orders" && (
          <OrdersTab
            orders={orders}
            loading={orderLoading}
            totalPages={totalPages}
            currentPage={currentPage}
            totalDocs={totalDocs}
            onPrev={handlePrev}
            onNext={handleNext}
            onViewDetails={handleViewDetails}
          />
        )}
        {activeTab === "addresses" && (
          <AddressesTab
            addresses={addresses}
            loading={userLoading}
            userName={userName}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSetDefault={handleSetDefault}
            onAddNew={handleAddNew}
          />
        )}
        {activeTab === "settings" && (
          <SettingsTab
            userName={userName}
            userEmail={userEmail}
            onUpdateProfile={() => setShowProfileModal(true)}
          />
        )}
      </div>

      {/* Modals */}
      {showAddrModal && (
        <AddAddressModal
          onClose={() => {
            setShowAddrModal(false);
            setEditingAddress(null);
          }}
          onSave={handleSaveAddress}
          editData={editingAddress}
        />
      )}
      {showProfileModal && (
        <UpdateProfileModal onClose={() => setShowProfileModal(false)} />
      )}
      {selectedOrderId && (
        <OrderDetailModal
          orderId={selectedOrderId}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}
