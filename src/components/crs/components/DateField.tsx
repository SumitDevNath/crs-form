import { useRef } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;

  disabled?: boolean;
  required?: boolean;

  error?: boolean;
  helperText?: string;
}

function getTodayNativeDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function convertNativeDateToDisplay(value: string): string {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return "";
  }

  return `${day}-${month}-${year}`;
}

function isFutureDisplayDate(value: string): boolean {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);

  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const enteredDate = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  enteredDate.setHours(0, 0, 0, 0);

  return enteredDate > today;
}

export default function DateField({
  label,
  value,
  onChange,

  disabled = false,
  required = false,

  // error = false,
  // helperText,
}: DateFieldProps) {
  const calendarInputRef = useRef<HTMLInputElement | null>(null);

  const handleCalendarClick = () => {
    if (disabled) {
      return;
    }

    const input = calendarInputRef.current;

    if (!input) {
      return;
    }

    try {
      input.showPicker();
    } catch {
      input.click();
    }
  };

  const handleCalendarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;

    onChange(convertNativeDateToDisplay(selectedDate));
  };

  const handleManualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;

    // Allow only numbers and hyphen.
    const sanitizedValue = enteredValue.replace(/[^0-9-]/g, "");

    // DD-MM-YYYY = maximum 10 characters.
    onChange(sanitizedValue.slice(0, 10));
  };

  const todayNativeDate = getTodayNativeDate();

  const handleBlur = () => {
    if (isFutureDisplayDate(value)) {
      onChange("");
    }
  };

  return (
    <div className="relative">
      <TextField
        fullWidth
        size="small"
        label={label}
        value={value}
        disabled={disabled}
        required={required}
        // error={error}
        // helperText={helperText}
        placeholder="DD-MM-YYYY"
        onChange={handleManualChange}
        onBlur={handleBlur}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
          },
        }}
        slotProps={{
          htmlInput: {
            maxLength: 10,
            inputMode: "numeric",
            "aria-label": `${label} in DD-MM-YYYY format`,
          },

          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size="small"
                  disabled={disabled}
                  onClick={handleCalendarClick}
                  aria-label={`Open calendar for ${label}`}
                  title="Open calendar"
                >
                  <CalendarMonthOutlinedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <input
        ref={calendarInputRef}
        type="date"
        max={todayNativeDate}
        onChange={handleCalendarChange}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
    </div>
  );
}
