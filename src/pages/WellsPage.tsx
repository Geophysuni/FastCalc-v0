// импортируем React и MUI (в том числе Box)
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Paper,
  ListItemIcon 
} from "@mui/material";
import { OilBarrel, OilBarrelOutlined } from "@mui/icons-material";
import KeyValueTile from "../components/Tiles/KeyValueTile";

const InnerSidebar = styled(Box)(({ theme }) => ({
  width: "240px",
  height: "100vh",
  backgroundColor: "#1976d2",
  color: "white",
  position: "fixed",
  left: "240px",
  top: 0,
  borderLeft: "2px solid white",
  zIndex: 900,
  paddingTop: "64px",
}));

const tileWidth = 320; // ширина плитки, аналогичная dashboard

const WellsPage = () => {
  const [selectedWell, setSelectedWell] = useState(1);

  const wells = [
    { 
      id: 1, name: "Well 1", status: "Активная", production: "215 барр/сут",
      gtm: { planned: 5, completed: 3 },
      productionDetails: { fluidRate: "350 барр/сут", oilRate: "215 барр/сут", watercut: "38%" }
    },
    { 
      id: 2, name: "Well 2", status: "На обслуживании", production: "0 барр/сут",
      gtm: { planned: 2, completed: 1 },
      productionDetails: { fluidRate: "0 барр/сут", oilRate: "0 барр/сут", watercut: "0%" }
    },
    { 
      id: 3, name: "Well 3", status: "Активная", production: "184 барр/сут",
      gtm: { planned: 7, completed: 7 },
      productionDetails: { fluidRate: "290 барр/сут", oilRate: "184 барр/сут", watercut: "36%" }
    },
  ];

  const currentWell = wells.find(w => w.id === selectedWell);

  return (
    <Box sx={{ display: 'flex' }}>
      <InnerSidebar>
        <Typography variant="h6" sx={{ p: 2, color: "white" }}>
          Скважины
        </Typography>
        <List>
          {wells.map((well) => (
            <ListItem key={well.id} disablePadding>
              <ListItemButton
                selected={selectedWell === well.id}
                onClick={() => setSelectedWell(well.id)}
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
                  primary={well.name} 
                  secondary={well.status}
                  primaryTypographyProps={{
                    fontWeight: selectedWell === well.id ? "bold" : "normal"
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </InnerSidebar>

      <Box sx={{ 
        marginLeft: "240px", 
        flex: 1,
        p: 3,
        minHeight: "calc(100vh - 64px)",
      }}>
        {currentWell && (
          <>
            <Typography variant="h4" gutterBottom>{currentWell.name}</Typography>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Основные параметры</Typography>
              <Typography>Статус: {currentWell.status}</Typography>
              <Typography>Добыча: {currentWell.production}</Typography>
              <Typography>Давление: {selectedWell * 15.7} атм</Typography>
              <Typography>Глубина: {2500 + selectedWell * 150} м</Typography>
            </Paper>

            {/* Блок с двумя плитками в ряд */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <KeyValueTile
                title="Данные ГТМ"
                value={
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography>Запланировано: <strong>{currentWell.gtm.planned}</strong></Typography>
                    <Typography>Выполнено: <strong>{currentWell.gtm.completed}</strong></Typography>
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
                    <Typography>Дебит жидкости: <strong>{currentWell.productionDetails.fluidRate}</strong></Typography>
                    <Typography>Дебит нефти: <strong>{currentWell.productionDetails.oilRate}</strong></Typography>
                    <Typography>Обводненность: <strong>{currentWell.productionDetails.watercut}</strong></Typography>
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

export default WellsPage;
