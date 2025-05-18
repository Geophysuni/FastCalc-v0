import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";

const Tile = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

interface OperationTemplateTileProps {
  name: string;
  price: number,
  duration: string;
  wellType: string;
  effectDuration: string;
  changes: {
    productionIncrease: number;
    watercutReduction: number;
  };
  onEdit: () => void;
}

const OperationTemplateTile: React.FC<OperationTemplateTileProps> = ({
  name,
  price,
  duration,
  wellType,
  effectDuration,
  changes,
  onEdit,
}) => {
  return (
    <Tile elevation={3}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">{name}</Typography>
        <Button
          startIcon={<EditIcon />}
          onClick={onEdit}
          variant="outlined"
          size="small"
        >
          Редактировать
        </Button>
      </Box>

      <Box mt={2}>
        <Typography>Стоимость: {price}</Typography>
        <Typography>Длительность: {duration}</Typography>
        <Typography>Тип скважин: {wellType}</Typography>
        <Typography>Срок действия: {effectDuration}</Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1">Эффект:</Typography>
        <Typography>
          Прирост добычи: +{changes.productionIncrease}%
        </Typography>
        <Typography>
          Снижение обводненности: -{changes.watercutReduction}%
        </Typography>
      </Box>
    </Tile>
  );
};

export default OperationTemplateTile;