import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';
import { Box, Typography, Stack, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import UserDetails from '../components/userDetails';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const user = useSelector((state) => state.user.user);

  const NavContent = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '1rem 2rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <FontAwesomeIcon sx={{ paddingBottom: '0.5rem', fontSize: '3rem' }} icon={faLeaf} size="2x" color='#1D4C6A' />
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} className='heading-text' gutterBottom paddingTop={1}>
          Kalavyuha
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} className='bold-text'>Chat with us</Typography>
      <Typography variant='subtitle-1'>Speak to our friendly teams via live chat</Typography>
      <List>
        <ListItem sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.2rem 0rem', marginTop: '0.5rem' }}>
          <FontAwesomeIcon icon={faRocketchat} size="md" color="#1D4C6A" />
          <Link style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Start live chat</Typography>} />
          </Link>
        </ListItem>
        <ListItem sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0' }}>
          <FontAwesomeIcon icon={faPaperPlane} size="md" color="#1D4C6A" />
          <Link style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Shoot us an email</Typography>} />
          </Link>
        </ListItem>
      </List>
      {user !== null ? <UserDetails /> : ""}
    </Box>
  );

  return (
    <Stack className='container' direction={{ xs: 'column', md: 'row' }} height="100vh" style={{ backgroundColor: '#E2E5EC' }}>
      {isMobile ? (
        <Box style={{ backgroundColor: '#E2E5EC' }}>
          <IconButton sx={{ position: 'absolute', top: '1rem', left: '1rem' }} onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} sx={{
            '& .MuiDrawer-paper': {
              width: '75vw',
              maxWidth: '300px',
            },
          }}>
            {NavContent()}
          </Drawer>
        </Box>
      ) : (
        <Box className='left-container'>
          {NavContent()}
        </Box>
      )}
    </Stack>
  );
};

export default NavBar;