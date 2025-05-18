//import React, { useState } from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, List, ListItem, ListItemButton, 
         ListItemText, Paper } from "@mui/material";
//import { Folder, FolderSpecial } from "@mui/icons-material";
import KeyValueTile from "../components/Tiles/KeyValueTile";

// Стили для внутреннего сайдбара
const InnerSidebar = styled(Box)(() => ({
  width: "240px",
  height: "100vh", // Занимаем всю высоту
  backgroundColor: "#1976d2",
  color: "white",
  position: "fixed",
  left: "240px",
  top: 0, // Верхний край совпадает с основным сайдбаром
  borderLeft: "2px solid white",
  zIndex: 900,
  paddingTop: "64px", // Компенсируем высоту шапки
}));

const tileWidth = 320; // ширина плитки, аналогичная dashboard

const LayersPage = () => {
  const [selectedLayer, setSelectedLayer] = useState(1);

  const layers = [
    { 
      id: 1, name: "Layer 1",
      gtm: { planned: 5, completed: 3 },
      productionDetails: { fluidRate: "350 барр/сут", oilRate: "215 барр/сут", watercut: "38%" },
      wells: {production: 10, injection: 10}
    },
    { 
      id: 2, name: "Layer 2", 
      // status: "На обслуживании", production: "0 барр/сут",
      gtm: { planned: 2, completed: 1 },
      productionDetails: { fluidRate: "0 барр/сут", oilRate: "0 барр/сут", watercut: "0%" },
      wells: {production: 4, injection: 0}
    },
    { 
      id: 3, name: "Layer 3", 
      // status: "Активная", production: "184 барр/сут",
      gtm: { planned: 7, completed: 7 },
      productionDetails: { fluidRate: "290 барр/сут", oilRate: "184 барр/сут", watercut: "36%" },
      wells: {production: 13, injection: 6}
    },
  ];

  const currentLayer = layers.find(l => l.id === selectedLayer);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Внутренний сайдбар - рендерится внутри MainContent */}
      <InnerSidebar>
        <Typography variant="h6" sx={{ p: 2, color: "white" }}>
          Пласты
        </Typography>
        <List>
          {layers.map((layer) => (
            <ListItem key={layer.id} disablePadding>
              <ListItemButton
                selected={selectedLayer === layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                sx={{
                  color: "white",
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                  },
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                {/* <ListItemIcon sx={{ color: "inherit" }}>
                  {selectedWell === well.id ? <OilBarrel /> : <OilBarrelOutlined />}
                </ListItemIcon> */}
                <ListItemText 
                  primary={layer.name} 
                  
                  primaryTypographyProps={{
                    fontWeight: selectedLayer === layer.id ? "bold" : "normal"
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </InnerSidebar>

      {/* Основной контент страницы */}
      <Box sx={{ 
        marginLeft: "240px", 
        flex: 1,
        p: 3,
        minHeight: "calc(100vh - 64px)",
      }}>
        {currentLayer && (
          <>
            <Typography variant="h4" gutterBottom>{currentLayer.name}</Typography>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Основные параметры</Typography>
              {/* <Typography>Статус: {currentLayer.status}</Typography>
              <Typography>Добыча: {currentLayer.production}</Typography> */}
              <Typography>Давление: {selectedLayer * 15.7} атм</Typography>
              <Typography>Глубина: {2500 + selectedLayer * 150} м</Typography>
            </Paper>

            {/* Блок с двумя плитками в ряд */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <KeyValueTile
                title="Данные ГТМ"
                value={
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography>Запланировано: <strong>{currentLayer.gtm.planned}</strong></Typography>
                    <Typography>Выполнено: <strong>{currentLayer.gtm.completed}</strong></Typography>
                  </Box>
                }
                sx={{
                  width: tileWidth,
                  minHeight: 100,
                  maxHeight: 120,
                  bgcolor: 'White',
                  p: 2,
                }}
              />

              <KeyValueTile
                title="Данные о добыче"
                value={
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography>Дебит жидкости: <strong>{currentLayer.productionDetails.fluidRate}</strong></Typography>
                    <Typography>Дебит нефти: <strong>{currentLayer.productionDetails.oilRate}</strong></Typography>
                    <Typography>Обводненность: <strong>{currentLayer.productionDetails.watercut}</strong></Typography>
                  </Box>
                }
                sx={{
                  width: tileWidth,
                  minHeight: 100,
                  maxHeight: 120,
                  bgcolor: 'White',
                  p: 2,
                }}
              />

              <KeyValueTile
                title="Данные о скважинах"
                value={
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography>Добывающие: <strong>{currentLayer.wells.production}</strong></Typography>
                    <Typography>Нагнетательные: <strong>{currentLayer.wells.injection}</strong></Typography>
                  </Box>
                }
                sx={{
                  width: tileWidth,
                  minHeight: 100,
                  maxHeight: 120,
                  bgcolor: 'White',
                  p: 2,
                }}
              />
            </Box>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>История добычи</Typography>
              <Typography>График будет отображаться здесь</Typography>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LayersPage;