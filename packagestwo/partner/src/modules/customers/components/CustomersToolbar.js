    import SearchInput from "@/sharedComponents/SearchInput/SearchInput";
import DateCalendar from "@/sharedComponents/DateCalendar/DateCalendar";
import Button from "@/sharedComponents/Button/Button"
import styles from "./CustomersToolbar.module.css";

export default function CustomersToolbar({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
}) {

  return (
    <div className={styles.toolbar}>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by name, email or ID..."
      />

      <DateCalendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
      />

      <Button className={styles.filterBtn}>
        <i className="bi bi-funnel"></i>
      </Button>

    </div>
  );
}