import React from "react";
import { Box, Typography } from "@mui/material";
import ActionButton from "../components/common/ActionButton";
import ScenarioSummary from "../components/Scenarios/ScenarioSummary";
import { useNavigate } from "react-router-dom";

const ScenarioPage: React.FC = () => {
  const navigate = useNavigate();
  

  // Синтетические данные
  const scenarios = [
    {
      name: "Сценарий 1: Базовый",
      forecastYears: 10,
      efficiency: "Высокая",
      productionVolume: "1.2 млн м³",
      recoveryFactor: "38%"
    },
    {
      name: "Сценарий 2: Альтернативный",
      forecastYears: 15,
      efficiency: "Средняя",
      productionVolume: "1.5 млн м³",
      recoveryFactor: "41%"
    }
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Сценарии 
      </Typography>

      <ActionButton 
        onClick={() => navigate("/scenarios/create")} 
        label="Добавить Сценарий" 
      />

      <Box mt={4}>
        {scenarios.map((scenario, index) => (
          <ScenarioSummary key={index} {...scenario} />
        ))}
      </Box>
    </Box>
  );
};

export default ScenarioPage;
