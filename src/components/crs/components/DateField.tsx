import { useRef } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
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
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}

function convertNativeDateToDisplay(value: string): string {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}-${month}-${year}` : "";
}

function isFutureDisplayDate(value: string): boolean {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!match) return false;

  const [, day, month, year] = match;
  const enteredDate = new Date(+year, +month - 1, +day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  return enteredDate > today;
}

export default function DateField({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
}: DateFieldProps) {
  const calendarInputRef = useRef<HTMLInputElement>(null);

  const handleCalendarClick = () => {
    if (disabled || !calendarInputRef.current) return;

    const input = calendarInputRef.current;

    try {
      input.showPicker();
    } catch {
      input.click();
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        size="small"
        label={label}
        value={value}
        disabled={disabled}
        required={required}
        placeholder="DD-MM-YYYY"
        onChange={(event) =>
          onChange(event.target.value.replace(/[^0-9-]/g, "").slice(0, 10))
        }
        onBlur={() => {
          if (isFutureDisplayDate(value)) onChange("");
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "#fff",
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

      <Box
        component="input"
        ref={calendarInputRef}
        type="date"
        max={getTodayNativeDate()}
        onChange={(event) =>
          onChange(convertNativeDateToDisplay(event.target.value))
        }
        tabIndex={-1}
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
