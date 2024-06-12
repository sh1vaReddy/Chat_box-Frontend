import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { Add, Remove } from '@mui/icons-material';

const UserItem = ({ user, handler, handlersLoading,isAdded=false,
styling={}
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack direction="row" alignItems="center" spacing="1rem" width="100%"
      {...styling}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {name}
        </Typography>
        {
          isAdded ? "":""
        }
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark":"primary.dark"
            }
          }}
          onClick={() => handler(_id)}
          disabled={handlersLoading}
        >
          {isAdded ? <Remove /> : <Add />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
