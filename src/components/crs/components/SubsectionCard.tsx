import { Box, Paper, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

interface SubsectionCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

export default function SubsectionCard({
  title,
  children,
  className = "",
  sx,
}: SubsectionCardProps) {
  return (
    <Paper
      component="section"
      variant="outlined"
      className={className}
      sx={[
        {
          border: "1px solid #cfd6df",
          borderRadius: "8px",
          bgcolor: "#fff",
          p: "20px",
          boxShadow: "none",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {title && (
        <Box
          sx={{
            mb: "16px",
            pb: "12px",
            borderBottom: "1px solid #d9dee5",
          }}
        >
          <Typography
            component="h3"
            sx={{
              m: 0,
              fontFamily: "inherit",
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 700,
              letterSpacing: "0.025em",
              textTransform: "uppercase",
              color: "#1f2937",
            }}
          >
            {title}
          </Typography>
        </Box>
      )}

      {children}
    </Paper>
  );
}
