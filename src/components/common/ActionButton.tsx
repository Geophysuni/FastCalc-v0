
// components/common/ActionButton.tsx
import React from "react";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface ActionButtonProps {
  onClick: () => void;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label }) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onClick}
      sx={{ alignSelf: "flex-start", mb: 2 }}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
