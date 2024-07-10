import React, { ReactNode } from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import {  Dashboard as DashboardIcon, List as ListIcon, LocalShipping, PowerSettingsNew } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearLogin } from '../action/action';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearLogin());
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Inventory Management
          </Typography>
          <Box sx={{ flexGrow: 1 }} /> {/* This pushes the logout button to the right */}
          <IconButton
            color="inherit"
            onClick={handleLogout}
          >
            <PowerSettingsNew />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem
              button
              component={NavLink}
              to="/dashboard"
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to="/inventory"
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to="/shipment"
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <ListItemIcon>
                <LocalShipping />
              </ListItemIcon>
              <ListItemText primary="Shipment" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
