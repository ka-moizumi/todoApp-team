import { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";

export const Datepick = (props) => {
  const { today, startDate, setStartDate } = props;
  registerLocale("ja", ja);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <DatePicker
      locale="ja"
      dateFormat="yyyy/MM/dd"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<CustomInput />}
      minDate={today}
    />
  );
};
