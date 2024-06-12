import { Dialog, DialogTitle, Stack, Typography, ListItem, Avatar,Button } from "@mui/material";
import { memo } from "react";
import { useAcceptFrienRequestMutation, useGetnotificationsQuery } from "../../redux/api/api";
import { useError } from "../../hooks/hook";
import { useSelector,useDispatch} from "react-redux";
import { LayoutLoader } from '../../components/layout/Loaders'
import { setIsNotification } from "../../redux/reducers/miscs";

import {useAsyncMutation} from '../../hooks/hook'

const Notification = () => {
  const { data, isLoading, error, isError } = useGetnotificationsQuery();
  const  [ acceptFrienRequest]=useAsyncMutation(useAcceptFrienRequestMutation);
  const {isNotification}=useSelector((state)=> state.miscs)
  const dispatch=useDispatch()

  const friendRequesthandler = async({ _id, accept }) => {
    dispatch(setIsNotification(false))
     await acceptFrienRequest("Accepting...",{requestId:_id,accept})
    
  };

  useError([{ isError, error }]);

  const Notificationclose = ()=>{
    dispatch(setIsNotification(false))
  }

  return (
    <Dialog open={isNotification} onClose={Notificationclose}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <LayoutLoader />
        ) : (
          <>
            {data?.request?.length > 0 ? (
              data?.request?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequesthandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};
const NotificationItem = memo(({ sender, _id, handler }) => {
  return (
    <ListItem>
      <Stack direction="row" alignItems="center" spacing="1rem" width="100%">
        <Avatar src={sender.avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${sender.name}`}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button variant="contained" onClick={() => handler({ _id, accept: true })}>
            Accept
          </Button>
          <Button variant="contained" color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notification;
