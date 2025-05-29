import React from "react";
import { Typography, Paper, Button, Stack } from "@mui/material";

interface ScenarioSummaryProps {
  name: string;
  forecastYears: number;
  efficiency: string;
  productionVolume: string;
  recoveryFactor: string;
  onOpen?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ScenarioSummary: React.FC<ScenarioSummaryProps> = ({
  name,
  forecastYears,
  efficiency,
  productionVolume,
  recoveryFactor,
  onOpen,
  onEdit,
  onDelete
}) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>{name}</Typography>
      <Typography variant="body1">Срок прогноза: {forecastYears} лет</Typography>
      <Typography variant="body1">Экономическая эффективность: {efficiency}</Typography>
      <Typography variant="body1">Объем добычи: {productionVolume}</Typography>
      <Typography variant="body1">Прогнозный КИН: {recoveryFactor}</Typography>

      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="outlined" onClick={onOpen}>Открыть</Button>
        <Button variant="outlined" onClick={onEdit}>Редактировать</Button>
        <Button variant="outlined" color="error" onClick={onDelete}>Удалить</Button>
      </Stack>
    </Paper>
  );
};

export default ScenarioSummary;
