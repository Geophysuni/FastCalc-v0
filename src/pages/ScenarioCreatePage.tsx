import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import InternalSidebar from "../components/Scenarios/InternalSidebar";
import LayersTab from "../components/Scenarios/LayersTab";
import WellsTab from "../components/Scenarios/WellsTab";
import ResultsTab from "../components/Scenarios/ResultsTab";

export interface LayerProperties {
  [key: string]: string | number;
}

export interface Layer {
  id: number;
  name: string;
  active: boolean;
  properties: LayerProperties;
}

const ScenarioCreatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"layers" | "wells" | "results">("layers");

  // Моковые данные слоев на уровне страницы
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: 1,
      name: "Слой 1",
      active: true,
      properties: {
        "Плотность": 2.5,
        "Толщина": 10,
        "Проницаемость": 150,
      },
    },
    {
      id: 2,
      name: "Слой 2",
      active: false,
      properties: {
        "Плотность": 2.7,
        "Толщина": 12,
        "Проницаемость": 180,
      },
    },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case "layers":
        return <LayersTab layers={layers} setLayers={setLayers} />;
      case "wells":
        return <WellsTab />;
      case "results":
        return <ResultsTab />;
      default:
        return null;
    }
  };

  return (
    <Box display="flex" height="100%">
      <InternalSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box
        sx={{
          marginLeft: "240px",
          flex: 1,
          p: 3,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Создание нового сценария
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default ScenarioCreatePage;
