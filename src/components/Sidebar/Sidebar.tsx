import React from "react";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";

const SidebarContainer = styled(Box)({
  width: "240px",
  height: "100vh",
  backgroundColor: "#1976d2", // Синий цвет из палитры MUI
  display: "flex",
  flexDirection: "column",
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
    "& .MuiListItemIcon-root": {
      color: theme.palette.common.white,
    },
    "& .MuiListItemText-primary": {
      fontWeight: "bold",
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      text: "Дашборд",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Пласты",
      icon: <LayersIcon />,
      path: "/layers",
    },
  ];

  return (
    <SidebarContainer>
      <Box sx={{ height: "64px", display: "flex", alignItems: "center", px: 3 }}>
        <Typography variant="h6" color="white">
          Нефтедобыча
        </Typography>
      </Box>
      <NavList>
        {navItems.map((item) => (
          <NavListItem key={item.path}>
            <Link to={item.path} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
              <NavButton
                className={location.pathname === item.path ? "active" : ""}
              >
                {/* <ListItemIcon sx={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon> */}
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ color: "white" }} 
                />
              </NavButton>
            </Link>
          </NavListItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;