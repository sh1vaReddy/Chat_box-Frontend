import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../redux/reducers/profile'; // Update the path to your slice file
import { useProfileQuery } from '../../redux/api/api';
import { Avatar, Stack, Typography, Grid, Card, CardContent, CardHeader, IconButton, Box } from '@mui/material';
import { Email, Edit } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { styled, keyframes } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';

// Keyframes for animations
const tiltUp = keyframes`
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(-10deg) rotateY(10deg);
  }
`;

const tiltDown = keyframes`
  from {
    transform: rotateX(-10deg) rotateY(10deg);
  }
  to {
    transform: rotateX(0deg) rotateY(0deg);
  }
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { users, loader } = useSelector((state) => state.profile);

  
  const { data: profileData, isLoading, error } = useProfileQuery();

  useEffect(() => {
    if (profileData && profileData.data) {
      dispatch(setProfile(profileData.data));
    }
  }, [profileData, dispatch]);

  if (isLoading || loader) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f8cdda, #1d2b64)',
        py: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item>
          <Stack spacing={4} alignItems="center">
            <Avatar
              src={users.avatarUrl} // Assuming profileData contains an avatarUrl
              sx={{
                width: 200,
                height: 200,
                mb: 2,
                border: "5px solid white",
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <ProfileCard text={users.bio} heading="Bio" Icon={<InfoOutlinedIcon sx={{ fontSize: 35 }} />} />
            <ProfileCard text={users.username} heading="Username" Icon={<Email />} />
            <ProfileCard text={users.name} heading="Name" Icon={<AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />} />
            <ProfileCard text={moment(users.createdAt).fromNow()} heading="Name" Icon={<CalendarMonthIcon sx={{ fontSize: 35}} />} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <StyledCard onClick={handleCardClick} isClicked={isClicked}>
      <CardHeader
        avatar={Icon}
        action={
          <IconButton aria-label="edit">
            <Edit />
          </IconButton>
        }
        title={heading}
        titleTypographyProps={{ variant: 'h6', color: 'primary' }}
      />
      <CardContent>
        <Typography variant='body1' sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
          {text}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)(({ isClicked }) => ({
  minWidth: 275,
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  backgroundColor: "#ffffff",
  transition: 'transform 0.3s, box-shadow 0.3s',
  transform: 'perspective(1000px)',
  animation: `${isClicked ? tiltUp : tiltDown} 0.3s forwards`,
  '&:hover': {
    cursor: 'pointer',
    transform: 'perspective(1000px) rotateX(-10deg) rotateY(10deg)',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.4)',
  },
  background: 'linear-gradient(145deg, #f5f7fa, #c3cfe2)',
  borderRadius: '15px',
  padding: '20px',
}));

export default Profile;
