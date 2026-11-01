import { Typography } from "@mui/material";

interface FieldErrorProps {
  message?: string;
}

export default function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;

  return (
    <Typography
      component="p"
      variant="inherit"
      sx={{
        m: 0,
        pt: "4px",
        fontSize: "0.75rem",
        lineHeight: "1rem",
        color: "#d32f2f",
      }}
    >
      {message}
    </Typography>
  );
}
