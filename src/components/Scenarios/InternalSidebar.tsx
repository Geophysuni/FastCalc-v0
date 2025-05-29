// src/components/Scenarios/InternalSidebar.tsx
import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type Tab = "layers" | "wells" | "results";

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const SidebarContainer = styled(Box)({
  width: "160px",
  height: "100vh", // Занимаем всю высоту
  backgroundColor: "#1976d2",
  color: "white",
  position: "fixed",
  left: "240px",
  top: 0, // Верхний край совпадает с основным сайдбаром
  borderLeft: "2px solid white",
  zIndex: 900,
  paddingTop: "64px",
});

const NavList = styled(List)({
  paddingTop: 0,
});

const NavListItem = styled(ListItem)({
  padding: 0,
});

const NavButton = styled(ListItemButton)(({ theme }) => ({
  "&.active": {
    backgroundColor: theme.palette.primary.light,
    "& .MuiListItemText-primary": {
      fontWeight: "bold",
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const InternalSidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "layers", label: "Layers" },
    { key: "wells", label: "Wells" },
    { key: "results", label: "Results" },
  ] as const;

  return (
    <SidebarContainer>
      <Box sx={{ height: "64px", display: "flex", alignItems: "center", px: 2 }}>
        <Typography variant="subtitle1" color="white">
          Сценарий
        </Typography>
      </Box>
      <NavList>
        {tabs.map((tab) => (
          <NavListItem key={tab.key}>
            <NavButton
              className={activeTab === tab.key ? "active" : ""}
              onClick={() => setActiveTab(tab.key)}
            >
              <ListItemText
                primary={tab.label}
                primaryTypographyProps={{ color: "white" }}
              />
            </NavButton>
          </NavListItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default InternalSidebar;
