"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateCalendar.module.css";

export default function DateCalendar({
  selectedDate,
  onChange,
  maxDate = new Date(),
}) {
  const handleClear = () => {
    onChange(null);
  };

  const handleThisMonth = () => {
    onChange(new Date());
  };

  const CalendarContainer = ({ className, children }) => {
    return (
      <div className={className}>
        {children}

        <div className={styles.footer}>
          <button onClick={handleClear} className={styles.clearBtn}>
            Clear
          </button>

          <button onClick={handleThisMonth} className={styles.thisMonthBtn}>
            This month
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendarWrapper}>
      <i className="bi bi-calendar3"></i>

      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="MMM yyyy"
        showMonthYearPicker
        placeholderText="Select date"
        maxDate={maxDate}
        className={styles.input}
        popperClassName={styles.popper}
        portalId="root-portal"
        calendarContainer={CalendarContainer}
        onKeyDown={(e) => e.preventDefault()}
      />
    </div>
  );
}