import { useState } from "react";
import { useRouter } from "next/router";

import DatePicker from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { FiCalendar } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import styles from "./SearchBox.module.css";

export default function SearchBox() {
  const router = useRouter();

  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");

  const [dateRange, setDateRange] = useState([]);

  const searchHandler = () => {
    const query = {};

    const toEnglishNumber = (str) => {
      return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    };

    if (originId) query.originId = originId;
    if (destinationId) query.destinationId = destinationId;

    if (dateRange.length === 2) {
      query.startDate = toEnglishNumber(
        dateRange[0].convert(gregorian).format("YYYY-MM-DD"),
      );

      query.endDate = toEnglishNumber(
        dateRange[1].convert(gregorian).format("YYYY-MM-DD"),
      );
    }
    router.push({
      pathname: "/",
      query,
    });
  };
  return (
    <div className={styles.search}>
      <button onClick={searchHandler}>جستجو</button>
      <div className={styles.item}>
        <FiCalendar />

        <DatePicker
          value={dateRange}
          onChange={setDateRange}
          range
          rangeHover
          numberOfMonths={2}
          onlyMonthPicker={false}
          calendar={persian}
          locale={persian_fa}
          format="YYYY/MM/DD"
          placeholder="تاریخ"
          calendarPosition="bottom"
          inputClass={styles.dateInput}
          className="custom-calendar"
        />
      </div>
      <div className={styles.item}>
        <HiOutlineLocationMarker />
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
        >
          <option value="">مقصد</option>
          <option value="2">سنندج</option>
          <option value="3">مادرید</option>
          <option value="5">سلیمانیه</option>
          <option value="6">هولر</option>
          <option value="7">مازندران</option>
          <option value="8">گیلان</option>
          <option value="9">ایتالیا</option>
        </select>
      </div>
      <div className={styles.item}>
        <HiOutlineLocationMarker />
        <select value={originId} onChange={(e) => setOriginId(e.target.value)}>
          <option value="">مبدا</option>
          <option value="1">تهران</option>
          <option value="2">سنندج</option>
          <option value="3">تبریز</option>
          <option value="4">شیراز</option>
        </select>
      </div>
    </div>
  );
}
