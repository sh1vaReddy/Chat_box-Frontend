import { Suspense, useEffect, useState, lazy } from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Backdrop,
  Typography,
  Skeleton,
} from "@mui/material";
import {
  KeyboardBackspace,
  Menu,
  Edit,
  Done,
  Delete,
  Add,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from ".././components/Stylecomponent";
import AvatarCard from "../components/shared/AvatarCard";
import sampleusers from "../components/constans/sample.users";
import { memo } from "react";
import ConfirmDiglogs from "../components/diglogs/ConfirmDiglogs";
import UserItem from "../components/shared/UserItem";
import {useDeleteGroupMutation, useGetChatDetailsQuery, useGetmyGroupsQuery, useRemoveMembersMutation,useRenameGroupMutation } from "../redux/api/api";
import { useAsyncMutation, useError } from "../hooks/hook";
import { LayoutLoader } from "../components/layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/miscs";
import { CircularProgress } from '@mui/material';

const confirmDeleteDialog = lazy(() =>
  import("../components/diglogs/ConfirmDiglogs")
);

const AddmemeberDialogs = lazy(() =>
  import("../components/diglogs/AddMemberDiglogs")
);
const Group = () => {
  const nav = useNavigate();
  const dispatch=useDispatch();
  const chatId = useSearchParams()[0].get("group");
  const {isAddMember} =useSelector((state)=>state.miscs )

  const navigateBack = () => {
    nav("/");
  };

  const [isMobile, setisMobile] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const[group,setGroup]=useState();
  const [groupNameUpdate, setGroupNameUpdate] = useState("");
  const [confirmDeleteDialog, setconfirmDeleteDialog] = useState(false);
 const myGroups=useGetmyGroupsQuery("")
 const data=myGroups?.data?.groups

 const [updateGroup,isLoadingGroupName]=useAsyncMutation(useRenameGroupMutation);
 const [removeMember,isLoadingremoveMember]=useAsyncMutation(useRemoveMembersMutation);
 const [deleteGroup,isLoadingdeleteGroup]=useAsyncMutation(useDeleteGroupMutation)


 const Groupdetails=useGetChatDetailsQuery(
  {chatId,populate:true},
  {skip:!chatId}
);
const [memebers,setmemebers]=useState([])

  const errors=[{
    isError:myGroups.isError,
    error:myGroups.error
  },
  {
    isError:Groupdetails.isError,
    error:Groupdetails.error
  }

]


    useError(errors)

    useEffect(() => {
      if(Groupdetails.data)
        {
          setGroup(Groupdetails?.data?.chat?.name)
          setGroupNameUpdate(Groupdetails?.data?.chat?.name)
          setmemebers(Groupdetails?.data?.chat?.member)   
        }
  
      return () => {
        setGroup("");
        setGroupNameUpdate("");
        setmemebers([])
        setisEdit(false);
      };
    }, [Groupdetails.data]);

  
    
  const OpenconfirmDeleteHandler = () => {
    setconfirmDeleteDialog(true);
    console.log("delete");
  };
  const closeConfrimDeleteHandler = () => {
    setconfirmDeleteDialog(false);
  };

  const deletehandler = () => {
    deleteGroup("Deleting Group....",chatId)
    closeConfrimDeleteHandler();
    nav("/Groups")
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  };

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={openAddMemberHandler}
      >
        Create A Group
      </Button>
      <Button
        size="large"
        color="error"
        variant="outlined"
        startIcon={<Delete />}
        onClick={OpenconfirmDeleteHandler}
      >
        Delete Group
      </Button>
    </Stack>
  );

  const handleMobileClose = () => {
    setisMobile(false);
  };

  const handleMobile = () => {
    setisMobile((prev) => !prev);
    console.log(isMobile);
  };

  const updateGroupName = () => {
    setisEdit(false);
    updateGroup("Updating Group Name...",{
      chatId,
      name:groupNameUpdate
    })
  };

  const removeMemberHandler = (id) => {
    removeMember("Removing Member for Group",{chatId,userId:id })
    console.log("remove Memeber", id);
  };

 

  const IconButtons = (
    <>
      <Box>
        <IconButton
          sx={{
            display: {
              xs: "block",
              sm: "none",
              position: "fixed",
              right: "1rem",
              top: "1rem",
            },
          }}
        >
          <Tooltip title="Menu" onClick={handleMobile}>
            <Menu />
          </Tooltip>
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "#3f51b5",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );

  const Groupname = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdate}
            onChange={(e) => setGroupNameUpdate(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <Done  />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{group}</Typography>
          <IconButton onClick={() => setisEdit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  return myGroups.isLoading ? <LayoutLoader/>:(
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupsList mygroups={data} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconButtons}
        {group && (
          <>
            {Groupname}
            <Typography>Members</Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {isLoadingremoveMember ? <CircularProgress/> :  memebers?.map((i) => (
                <UserItem
                  user={i}
                  key={i._id}
                  styling={{
                    boxShadow: "0 0 0.5rem 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddmemeberDialogs chatId={chatId}/>
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDiglogs
            open={confirmDeleteDialog}
            handleclose={closeConfrimDeleteHandler}
            deletehanlder={deletehandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobile}
        onClose={handleMobileClose}
      >
        <GroupsList mygroups={sampleusers} chatId={chatId} w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", mygroups = [], chatId }) => {
  return (
    <Stack 
    width={w}
    sx={{
    
      height: "100vh",
      overflow: "auto",
    }}
    
    >
      {mygroups.length > 0 ? (
        mygroups.map((group) => (
          <GroupListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography textAlign={"center"} padding="1rem">
          No Groups
        </Typography>
      )}
    </Stack>
  );
};


const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      spacing={"1rem"}
      alignItems={"center"}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction="row">
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
