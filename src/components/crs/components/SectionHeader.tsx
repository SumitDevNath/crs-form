import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  image: string;
  title: string;
  subtitle?: string;
  mandatory?: boolean;
  rightContent?: ReactNode;
}

export default function SectionHeader({
  image,
  title,
  subtitle,
  mandatory = false,
  rightContent,
}: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        bgcolor: "#fff",
        pb: 1,
        "@media (min-width:640px)": {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            flexShrink: 0,
            borderRadius: "6px",
          }}
        >
          <Box
            component="img"
            src={image}
            alt=""
            aria-hidden="true"
            sx={{ width: 24, height: 24, objectFit: "contain" }}
          />
        </Box>

        <Box>
          <Typography
            component="h2"
            variant="inherit"
            sx={{
              m: 0,
              fontSize: 18,
              lineHeight: 1.5,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              component="p"
              variant="inherit"
              sx={{
                mt: 0.5,
                mb: 0,
                fontSize: 14,
                lineHeight: "20px",
                color: "#566575",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {mandatory && (
          <Typography
            component="div"
            variant="inherit"
            sx={{
              borderRadius: "9999px",
              bgcolor: "#fdecec",
              px: 2,
              py: 1,
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: 500,
              color: "#c62828",
            }}
          >
            * Mandatory field
          </Typography>
        )}

        {rightContent}
      </Box>
    </Box>
  );
}
