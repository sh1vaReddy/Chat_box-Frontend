import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NotFounds = () => {
  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', marginTop: '10%' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h1" color="textPrimary">
          404
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          The page you are looking for doesn’t exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Home />}
          component={Link}
          to="/login"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFounds;
