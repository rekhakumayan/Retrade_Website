"use client";

import SearchInput from "@/sharedComponents/SearchInput/SearchInput";
import styles from "./OrdersToolbar.module.css";
import DateCalendar from "@/sharedComponents/DateCalendar/DateCalendar";

export default function OrdersToolbar({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate
}) {

  return (
    <div className={styles.toolbar}>
      
      <div className={styles.left}>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by Order ID or customer name..."
        />
      </div>

      <div className={styles.right}>
         <DateCalendar
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

    </div>
  );
}