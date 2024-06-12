import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import UserItem from "../shared/UserItem";
import { useState } from "react";
import { useAsyncMutation, useError } from "../../hooks/hook";
import {
  useAddmembersMutation,
  useAvaliableFriendsQuery,
} from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/miscs";
import { useDispatch, useSelector } from "react-redux";

const AddMemberDialog = ({ chatId }) => {
  const [selectMembers, setSelectMembers] = useState([]);
  const [Addmember, isLoadingAddmember] = useAsyncMutation(
    useAddmembersMutation
  );
  const { isAddMember } = useSelector((state) => state.miscs);
  const dispatch = useDispatch();

  const selectMemberHandler= (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const { isLoading, data, isError, error } = useAvaliableFriendsQuery(chatId);

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberHandler = () => {
    Addmember("Adding Members...", { chatId, members:selectMembers });
    closeHandler();
  };
  useError([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i.id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              variant="h6"
            >
              No Friends
            </Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-evenly"}
        >
          <Button
            variant="contained"
            disabled={isLoadingAddmember}
            onClick={addMemberHandler}
          >
            Add Friend
          </Button>
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
