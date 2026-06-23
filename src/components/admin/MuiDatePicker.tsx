import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";

interface Props {
  value: string; // YYYY-MM-DD or ""
  onChange: (val: string) => void;
  placeholder?: string;
  id?: string;
}

export function MuiDatePicker({ value, onChange, placeholder = "YYYY-MM-DD", id }: Props) {
  const parsed = value && dayjs(value).isValid() ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={parsed}
        onChange={(newVal: Dayjs | null) => {
          if (newVal && newVal.isValid()) {
            onChange(newVal.format("YYYY-MM-DD"));
          } else {
            onChange("");
          }
        }}
        views={["year", "month", "day"]}
        openTo="year"
        format="YYYY-MM-DD"
        yearsOrder="desc"
        slotProps={{
          textField: {
            id,
            placeholder,
            size: "small",
            variant: "outlined",
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                fontSize: "14px",
                height: "40px",
                backgroundColor: "#fff",
                fontFamily: "inherit",
                "& fieldset": { borderColor: "hsl(214.3 31.8% 91.4%)" },
                "&:hover fieldset": { borderColor: "hsl(214.3 31.8% 78%)" },
                "&.Mui-focused fieldset": {
                  borderColor: "#2DD4BF",
                  borderWidth: "1.5px",
                },
              },
              "& .MuiInputBase-input": {
                padding: "8px 12px",
                fontFamily: "inherit",
              },
            },
          },
          popper: {
            placement: "bottom-start",
            sx: {
              zIndex: 9999,
              "& .MuiPaper-root": {
                borderRadius: "16px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
                border: "1px solid hsl(214.3 31.8% 91.4%)",
                fontFamily: "inherit",
              },
              "& .MuiPickersCalendarHeader-label": {
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: 600,
              },
              // Year grid
              "& .MuiPickersYear-yearButton": {
                fontFamily: "inherit",
                borderRadius: "8px",
              },
              "& .MuiPickersYear-yearButton.Mui-selected": {
                backgroundColor: "#2DD4BF !important",
                color: "#fff !important",
              },
              "& .MuiPickersYear-yearButton:hover": {
                backgroundColor: "#e6faf8",
              },
              // Month grid
              "& .MuiPickersMonth-monthButton.Mui-selected": {
                backgroundColor: "#2DD4BF !important",
                color: "#fff !important",
              },
              // Day grid
              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: "#2DD4BF !important",
              },
              "& .MuiPickersDay-root:hover": {
                backgroundColor: "#e6faf8",
              },
              // Today ring
              "& .MuiPickersDay-root.MuiPickersDay-today": {
                borderColor: "#2DD4BF",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
