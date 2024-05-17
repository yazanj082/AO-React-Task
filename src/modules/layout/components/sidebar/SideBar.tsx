import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import MedicationIcon from "@mui/icons-material/Medication";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./SideBar.module.css";

const SideBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const items = [
    {
      name: "Home",
      icon: <HomeIcon className={styles.sideBarIcon} />,
      route: "/",
    },
    {
      name: "Star Wars",
      icon: <StarIcon className={styles.sideBarIcon} />,
      route: "/star-wars",
    },
    {
      name: "Patient",
      icon: <MedicationIcon className={styles.sideBarIcon} />,
      route: "/patient",
    },
  ];

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {isMobile && (
        <IconButton className={styles.menuButton} onClick={handleToggle}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        className={`${styles.sideBar} ${
          isMobile && open ? styles.sideBarOpen : styles.sideBarClosed
        }`}
        variant={isMobile ? "temporary" : "permanent"}
      >
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                navigate(item.route);
                if (isMobile) setOpen(false);
              }}
              className={`${styles.sideBarItem} ${
                location.pathname === item.route
                  ? styles.sideBarItemActive
                  : styles.sideBarItemInActive
              }`}
            >
              <ListItemText
                primary={item.name}
                className={styles.sideBarName}
              />
              {item.icon}
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default SideBar;
