import { Switch } from "@mui/material";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
  disabled?: boolean;
}

export default function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <Switch
      checked={checked}
      onChange={(_, value) => onChange(value)}
      disabled={disabled}
      disableRipple
      slotProps={{ input: { "aria-label": ariaLabel } }}
      sx={{
        width: 44,
        height: 24,
        p: 0,
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,

        "& .MuiSwitch-switchBase": {
          p: "2px",

          "&.Mui-checked": {
            transform: "translateX(20px)",
            color: "#fff",

            "& + .MuiSwitch-track": {
              bgcolor: "#0566c7",
              opacity: 1,
            },
          },

          "&.Mui-focusVisible + .MuiSwitch-track": {
            boxShadow: "0 0 0 2px rgba(5, 102, 199, 0.3)",
          },

          "&.Mui-disabled": {
            cursor: "not-allowed",
          },

          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 1,
          },
        },

        "& .MuiSwitch-thumb": {
          width: 20,
          height: 20,
          bgcolor: "#fff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        },

        "& .MuiSwitch-track": {
          borderRadius: 12,
          bgcolor: "#c5cad4",
          opacity: 1,
          transition: "background-color 150ms ease",
        },
      }}
    />
  );
}
