import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import InternalSidebar from "../components/Scenarios/InternalSidebar";
import LayersTab from "../components/Scenarios/LayersTab";
import WellsTab from "../components/Scenarios/WellsTab";


export type LayerProperties = {
  "Плотность": string;
  "Толщина": string;
  "Проницаемость": string;
  "Пористость": string;
};

export type Layer = {
  id: number;
  name: string;
  active: boolean;
  properties: LayerProperties;
};

export type WellProperties = {
  "Дата ввода": string;
  "Стартовый дебит нефти": string;
  "Стартовый дебит жидкости": string;
  "Слой": string;
};

export type Well = {
  id: number;
  name: string;
  active: boolean;
  properties: WellProperties;
};

const ScenarioCreatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"layers" | "wells" | "results">("layers");

  // Мок-данные для слоёв
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: 1,
      name: "Пласт БВ8",
      active: true,
      properties: {
        "Плотность": "2.45",
        "Толщина": "12.5",
        "Проницаемость": "150",
        "Пористость": "18",
      },
    },
    {
      id: 2,
      name: "Пласт АВ1",
      active: true,
      properties: {
        "Плотность": "2.67",
        "Толщина": "8.2",
        "Проницаемость": "85",
        "Пористость": "15",
      },
    },
    {
      id: 3,
      name: "Пласт ЮК2",
      active: false,
      properties: {
        "Плотность": "2.71",
        "Толщина": "22.0",
        "Проницаемость": "210",
        "Пористость": "23",
      },
    },
  ]);

  // Мок-данные для скважин
  const [wells, setWells] = useState<Well[]>([
    {
      id: 101,
      name: "Скв. №125",
      active: true,
      properties: {
        "Дата ввода": "15.03.2018",
        "Стартовый дебит нефти": "120.3",
        "Стартовый дебит жидкости": "0",
        "Слой": "Пласт БВ8",
      },
    },
    {
      id: 102,
      name: "Скв. №126",
      active: true,
      properties: {
        "Дата ввода": "22.07.2019",
        "Стартовый дебит нефти": "85.6",
        "Стартовый дебит жидкости": "0",
        "Слой": "Пласт АВ1",
      },
    },
    {
      id: 103,
      name: "Скв. №127-д",
      active: false,
      properties: {
        "Дата ввода": "03.11.2020",
        "Стартовый дебит нефти": "0",
        "Стартовый дебит жидкости": "350",
        "Слой": "Пласт ЮК2",
      },
    },
  ]);

  return (
    <Box display="flex" height="100vh">
      <InternalSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <Box sx={{ marginLeft: "240px", flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
          {activeTab === "layers" && "Управление пластами"}
          {activeTab === "wells" && "Управление скважинами"}
          {activeTab === "results" && "Анализ разработки"}
        </Typography>
        
        {activeTab === "layers" && <LayersTab layers={layers} setLayers={setLayers} />}
        {activeTab === "wells" && <WellsTab wells={wells} setWells={setWells} />}
        
      </Box>
    </Box>
  );
};

export default ScenarioCreatePage;