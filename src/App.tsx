//import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import DashboardPage from "./pages/DashboardPage";
import LayersPage from "./pages/LayersPage";
import WellsPage from "./pages/WellsPage";
import OperationsPage from "./pages/OperationsPage";
import ScenarioPage from "./pages/ScenarioPage";
import ScenarioCreatePage from "./pages/ScenarioCreatePage";

// Основной контейнер с белым фоном
const AppContainer = styled(Box)({
  backgroundColor: "#ffffff", // Белый фон всего приложения
  minHeight: "100vh",
});

// Стили для основного сайдбара
const MainSidebar = styled(Box)(({ theme }) => ({
  width: "240px",
  height: "100vh",
  backgroundColor: theme.palette.primary.main,
  position: "fixed",
  left: 0,
  top: 0,
  overflow: "hidden",
  zIndex: 1000,
}));

// Стили для контентной области
const MainContent = styled(Box)({
  marginLeft: "240px",
  minHeight: "100vh",
  backgroundColor: "#ffffff", // Белый фон контентной области
});

// Компонент навигации
const NavItem = ({ to, text }: { to: string; text: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={to}
        sx={{
          color: "white",
          backgroundColor: isActive ? "primary.light" : "inherit",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        {/* <ListItemIcon sx={{ color: "inherit" }}>
          {icon}
        </ListItemIcon> */}
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

const App = () => {
  return (
    <AppContainer>
      <Router basename="/FastCalc-v0">
        {/* Основной сайдбар */}
        <MainSidebar>
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
            <Typography variant="h6" color="white">
              Нефтедобыча
            </Typography>
          </Box>
          <List>
            <NavItem to="/dashboard"  text="Дашборд" />
            <NavItem to="/layers"  text="Пласты" />
            <NavItem to="/wells"  text="Скважины" />
            <NavItem to="/operations"  text="ГТМ" />
            <NavItem to="/scenarios"  text="Сценарии" />
          </List>
        </MainSidebar>

        {/* Основной контент */}
        <MainContent>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/layers" element={<LayersPage />} />
            <Route path="/wells" element={<WellsPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/scenarios" element={<ScenarioPage />} />
            <Route path="/scenarios/create" element={<ScenarioCreatePage />} />
          </Routes>
        </MainContent>
      </Router>
    </AppContainer>
  );
};

export default App;