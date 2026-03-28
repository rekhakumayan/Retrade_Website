"use client";

import { useState } from "react";
import Header from "@/sharedComponents/Header/Header";
import CustomersToolbar from "../components/CustomersToolbar";
import CustomersList from "../components/CustomersList";
import styles from "./CustomersPage.module.css";

export default function CustomersPage() {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>

        <Header
          title="Customer Database"
          subtitle="Manage relationships and analyze buying patterns"
          rightContent={
            <span className={styles.leadsBadge}>
              1 UNIQUE LEADS
            </span>
          }
        />

        <div className={styles.tableCard}>

          <CustomersToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <CustomersList
            searchTerm={searchTerm}
            selectedDate={selectedDate}
          />

        </div>

      </div>
    </section>
  );
}