"use client";
import { useState, useEffect } from "react";
import ProfileModal from "./shared/ProfileModal";
import styles from "./shared/ProfileModal.module.css";

const TAGS = ["Home", "Work", "Other"];

const COUNTRY = { code: "IN", name: "India" };

const PINCODE_CONFIG = {
  pattern: /^[1-9][0-9]{5}$/,
  maxLength: 6,
  placeholder: "e.g. 110016",
};

const EMPTY = {
  tag: "Home",
  country: "IN",
  city: "",
  pincode: "",
  houseNo: "",
  street: "",
};

export default function AddAddressModal({ onClose, onSave, editData = null }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [statesError, setStatesError] = useState(false);

  const [pincodeValidating, setPincodeValidating] = useState(false);
  const [pincodeStateError, setPincodeStateError] = useState("");

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    setForm(
      editData
        ? {
            tag: editData.tag || "Home",
            country: "IN",
            city: editData.city || "",
            pincode: editData.pincode || "",
            houseNo: editData.houseNo || "",
            street: editData.street || "",
          }
        : EMPTY,
    );
    setErrors({});
    setPincodeStateError("");
  }, [editData]);

  const fetchStates = async () => {
    setStatesLoading(true);
    setStatesError(false);
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" }),
        },
      );
      const data = await res.json();
      if (!data.error && data.data?.states) {
        setStates(data.data.states.map((s) => s.name).sort());
      } else {
        setStatesError(true);
      }
    } catch {
      setStatesError(true);
    } finally {
      setStatesLoading(false);
    }
  };

  const handleCityChange = (value) => {
    setForm((prev) => ({ ...prev, city: value, pincode: "" }));
    setErrors((prev) => ({ ...prev, city: "", pincode: "" }));
    setPincodeStateError("");
  };

  const handlePincodeChange = async (value) => {
    const cleaned = value.replace(/\D/g, "");
    handleChange("pincode", cleaned);
    setPincodeStateError("");

    if (cleaned.length === 6 && form.city) {
      setPincodeValidating(true);
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${cleaned}`,
        );
        const data = await res.json();
        if (data[0].Status === "Success") {
          const pincodeState = data[0].PostOffice[0].Circle;
          if (
            !pincodeState.toLowerCase().includes(form.city.toLowerCase()) &&
            !form.city.toLowerCase().includes(pincodeState.toLowerCase())
          ) {
            setPincodeStateError(
              `This pincode belongs to ${pincodeState}, not ${form.city}`,
            );
          }
        } else {
          setPincodeStateError("Invalid pincode. Please check and try again");
        }
      } catch {
      } finally {
        setPincodeValidating(false);
      }
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.city.trim()) e.city = "State is required";
    if (!form.pincode.trim()) {
      e.pincode = "Pincode is required";
    } else if (!PINCODE_CONFIG.pattern.test(form.pincode)) {
      e.pincode = "Invalid pincode. Must be 6 digits, cannot start with 0";
    } else if (pincodeStateError) {
      e.pincode = pincodeStateError;
    }
    if (!form.houseNo.trim()) e.houseNo = "House / Flat no. is required";
    if (!form.street.trim()) e.street = "Street / Area is required";
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    try {
      await onSave(form);
    } finally {
      setLoading(false);
    }
  };

  const isPincodeDisabled = !form.city.trim();

  return (
    <ProfileModal
      title={editData ? "Edit Address" : "Add New Address"}
      onClose={onClose}
      onSave={handleSave}
      saveLabel={editData ? "Update Address" : "Save Address"}
      loading={loading}
    >
      <div className="mb-4">
        <p className={styles.fieldLabel}>Address Type</p>
        <div className={`${styles.tagGroup} d-flex flex-wrap`}>
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.tagBtn} ${form.tag === t ? styles.tagActive : ""}`}
              onClick={() => handleChange("tag", t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-6">
          <p className={styles.fieldLabel}>Country</p>
          <input
            className={styles.fieldInput}
            value={COUNTRY.name}
            readOnly
          />
        </div>
        <div className="col-6">
          <p className={styles.fieldLabel}>State</p>
          <select
            className={styles.fieldInput}
            value={form.city}
            disabled={statesLoading}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            <option value="">
              {statesLoading
                ? "Loading..."
                : statesError
                  ? "Load failed"
                  : "Select state"}
            </option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {statesError && (
            <input
              className={`${styles.fieldInput} mt-2`}
              placeholder="Enter state manually"
              value={form.city}
              maxLength={15}
              onChange={(e) => handleCityChange(e.target.value)}
            />
          )}
          {errors.city && <p className={styles.fieldError}>{errors.city}</p>}
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-6">
          <p className={styles.fieldLabel}>Pincode</p>
          <input
            className={styles.fieldInput}
            placeholder={
              isPincodeDisabled
                ? "Select state first"
                : PINCODE_CONFIG.placeholder
            }
            disabled={isPincodeDisabled}
            maxLength={PINCODE_CONFIG.maxLength}
            value={form.pincode}
            onChange={(e) => handlePincodeChange(e.target.value)}
          />
          {pincodeValidating && (
            <p className={styles.fieldError} >
              Validating...
            </p>
          )}
          {!pincodeValidating && pincodeStateError && (
            <p className={styles.fieldError}>{pincodeStateError}</p>
          )}
          {!pincodeValidating && !pincodeStateError && errors.pincode && (
            <p className={styles.fieldError}>{errors.pincode}</p>
          )}
        </div>

        <div className="col-6">
          <p className={styles.fieldLabel}>House / Flat No.</p>
          <input
            className={styles.fieldInput}
            placeholder="e.g. H-45"
            maxLength={10}
            value={form.houseNo}
            onChange={(e) => handleChange("houseNo", e.target.value)}
          />
          {errors.houseNo && (
            <p className={styles.fieldError}>{errors.houseNo}</p>
          )}
        </div>
      </div>

      <div className="mb-1">
        <p className={styles.fieldLabel}>Street / Area / Locality</p>
        <input
          className={styles.fieldInput}
          placeholder="e.g. Green Park, Sector 12"
          maxLength={20}
          value={form.street}
          onChange={(e) => handleChange("street", e.target.value)}
        />
        {errors.street && <p className={styles.fieldError}>{errors.street}</p>}
      </div>
    </ProfileModal>
  );
}
