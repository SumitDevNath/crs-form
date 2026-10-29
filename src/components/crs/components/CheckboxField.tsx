import { Checkbox, FormControlLabel } from "@mui/material";

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function CheckboxField({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxFieldProps) {
  return (
    <FormControlLabel
      sx={{
        marginLeft: 0,
        marginRight: 0,
        alignItems: "center",

        "& .MuiFormControlLabel-label": {
          fontSize: "0.8125rem",
          color: "#2c3b4b",
        },
      }}
      control={
        <Checkbox
          size="small"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          sx={{
            padding: "5px",
            marginRight: "4px",
            color: "#94a3b8",

            "&.Mui-checked": {
              color: "#12608f",
            },
          }}
        />
      }
      label={label}
    />
  );
}
