import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  Add,
  Group,
  Logout,
  NotificationAdd,
} from "@mui/icons-material";
import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants/Config";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobileMenuFriend,
  setIsSearch,
  setIsNotification,
  setIsNewGroup,
} from "../../redux/reducers/miscs";

const SerachDiloga = lazy(() => import("../specific/Serach"));
const Notification = lazy(() => import("../specific/Notification"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.miscs
  );

  const handleMobile = () => {
    dispatch(setIsMobileMenuFriend(true));
  };

  const addOption = () => {
    dispatch(setIsNewGroup(true));
  };

  const searchDialogue = () => {
    dispatch(setIsSearch(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
  };

  const groupage = () => {
    nav("/Groups");
  };

  const Logouthandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/logout`, {
        withCredentials: true,
      });
      console.log(data)
      dispatch(userNotExists());
      toast.success(data?.message || "Logout Sucesfully");
    } catch (error) {
      toast.error("Failed to Log out");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton component={Link} to="/profile">
              <Avatar sx={{ width: 40, height: 40 }} />
            </IconButton>
            <Box sx={{ marginLeft: 2 }}>
              <Typography
                sx={{
                  display: "flex",
                  fontSize: 22,
                }}
              >
                Chat Box
              </Typography>
            </Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <Menu />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconBtn
              title={"Search"}
              icon={<Search />}
              onClick={searchDialogue}
            />
            <IconBtn
              title={"Create a new group"}
              icon={<Add />}
              onClick={addOption}
            />
            <IconBtn
              title={"Create an add group"}
              icon={<Group />}
              onClick={groupage}
            />
            <IconBtn
              title={"Notifications"}
              icon={<NotificationAdd />}
              onClick={openNotification}
            />
            <IconBtn
              title={"Logout"}
              icon={<Logout />}
              onClick={Logouthandler}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SerachDiloga />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup />
        </Suspense>
      )}
    </Box>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
