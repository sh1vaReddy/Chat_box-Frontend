import { Typography, Box, Button } from "@mui/material";
import Applayout from "../components/layout/Applayout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      p={"2rem"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      bgcolor="#f0f0f0"
    >
      <Typography variant="h4" mb={2} textAlign="center" color="#333">
        Welcome to Chat Box
      </Typography>
      <Typography variant="body1" mb={4} textAlign="center" color="#666">
        Select a friend to start chatting
      </Typography>
     
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/Chart/:id"
      >
        Browse Friends
      </Button>
    </Box>
  );
};

export default Applayout(Home);
