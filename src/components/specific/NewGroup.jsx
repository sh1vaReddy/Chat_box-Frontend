import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";
import { useAvaliableFriendsQuery,  useNewGroupMutation } from "../../redux/api/api";
import {useAsyncMutation, useError} from '../../hooks/hook'
import { useDispatch, useSelector } from "react-redux";
import {  setIsNewGroup } from "../../redux/reducers/miscs";
import toast from "react-hot-toast";

const NewGroup = () => {
  const dispathc=useDispatch();

  const {isNewGroup}=useSelector((state)=>state.miscs)
  const [selectmembers, setselectmembers] = useState([]);

  const {isError,error,isLoading,data}=useAvaliableFriendsQuery("")

  const [newGroup,isLoadingNewGroup] =useAsyncMutation(useNewGroupMutation)

  const submithandlercreate = () => {
    if(!NewGroup.value)
       return toast.error("Group Name is Required")
    console.log(NewGroup.value,selectmembers);
    newGroup("Creating New Group",{name:NewGroup.value,members:selectmembers})
    closeHandler();
  };

  const NewGroup = useInputValidation("");

  const errors=[{
    isError,
    error
  }]
  useError(errors)
  
  const selectMember = (id) => {
    setselectmembers(prev=>prev.map(user=>user._id===id ? {...user,isAdded:!user.isAdded }:
    user
    ))
    setselectmembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () =>{
    dispathc(setIsNewGroup(false))

  }

  const isLoadingSendFriendRequest = false;
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={NewGroup.value}
          onChange={NewGroup.changeHandler}
        />
        <Typography>members</Typography>
        <Stack>
          {isLoading ? <Skeleton/>:  data?.friends?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMember}
              handlersLoading={isLoadingSendFriendRequest}
              isAdded={selectmembers.includes(i._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button variant="contained" 
          onClick={submithandlercreate}
          disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
