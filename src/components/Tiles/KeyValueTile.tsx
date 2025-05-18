import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const TileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  height: 280, // фиксированная высота, можно подкорректировать под дизайн
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)'
  }
}));

interface KeyValueTileProps extends React.ComponentProps<typeof Paper> {
  title: string;
  value: React.ReactNode;
}

const KeyValueTile: React.FC<KeyValueTileProps> = ({ title, value, sx }) => {
  return (
    <TileContainer elevation={3} sx={sx}>
      <Typography 
        variant="h6" 
        color="primary"
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {value}
      </Box>
    </TileContainer>
  );
};

export default KeyValueTile;
