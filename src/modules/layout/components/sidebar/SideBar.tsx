import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import MedicationIcon from '@mui/icons-material/Medication';
import { List, ListItem, ListItemText, Divider, Box } from '@mui/material';

import styles from './SideBar.module.css'

const SideBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const items = [
        { name: 'Home', icon: <HomeIcon className={styles.sideBarIcon} />, route: '/' },
        { name: 'Star Wars', icon: <StarIcon className={styles.sideBarIcon} />, route: '/star-wars' },
        { name: 'Patient', icon: <MedicationIcon className={styles.sideBarIcon} />, route: '/patient' }
    ]

    return (
        <Box className={styles.sideBar}>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index} onClick={() => { navigate(item.route) }}
                        className={`${styles.sideBarItem} ${location.pathname == item.route ? styles.sideBarItemActive : styles.sideBarItemInActive}`}>
                        <ListItemText primary={item.name} className={styles.sideBarName} />
                        {item.icon}
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
};

export default SideBar;
