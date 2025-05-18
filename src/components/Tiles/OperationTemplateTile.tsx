import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface OperationTemplateTileProps {
  name: string;
  duration: string;
  wellType: string;
  effectDuration: string;
  changes: {
    productionIncrease: number;
    watercutReduction: number;
  };
}

const OperationTemplateTile: React.FC<OperationTemplateTileProps> = ({
  name,
  duration,
  wellType,
  effectDuration,
  changes,
}) => {
  return (
    <Card variant="outlined" sx={{ width: "100%", maxWidth: 800, mx: "auto" }}>
      <CardContent>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} width="100%">
          <Box width={{ xs: "100%", sm: "50%" }} pr={2}>
            <Typography variant="h6" noWrap>{name}</Typography>
            <Typography>Тип скважин: {wellType}</Typography>
          </Box>
          <Box width={{ xs: "100%", sm: "50%" }} pl={2}>
            <Typography>Длительность: {duration}</Typography>
            <Typography>Увеличение добычи: {changes.productionIncrease}%</Typography>
            <Typography>Снижение обводненности: {changes.watercutReduction}%</Typography>
            <Typography>Длительность эффекта: {effectDuration}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OperationTemplateTile;
