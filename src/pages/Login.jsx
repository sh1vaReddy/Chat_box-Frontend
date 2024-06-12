import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import { useState } from "react";
import {CameraAlt} from '@mui/icons-material'
import { VisuallyHiddenInput } from "../components/Stylecomponent";
import {useFileHandler, useInputValidation}  from '6pp'
import { usernamevalidate } from "../utils/Validate";
import axios from 'axios';
import { server} from '../constants/Config'
import {useDispatch} from 'react-redux'
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setLogin] = useState(true);

  const name=useInputValidation("")
  const bio=useInputValidation("")
  const username=useInputValidation("",usernamevalidate)
  const password=useInputValidation("")
  const disaptch=useDispatch();

  const avatra=useFileHandler("single")


  const handlesubmiteregister= async(e)=>
  {
    e.preventDefault();
    const formData=new  FormData();
      formData.append("avatar",avatra.file);
      formData.append("name",name.value);
      formData.append("bio",bio.value);
      formData.append("username",username.value);
      formData.append("password",password.value);
        const config={
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    try{
      const {data} =await axios.post(`${server}/api/v1/reg`,formData,config)
      disaptch(userExists(true));
         toast.success(data.message ||"Sucessfully Register")
    }catch(error)
    {
      toast.error(error?.response?.data?.message || "Register Failed");
    }
  }

  const handlesubmitlogin = async(e) =>
  {
    e.preventDefault()
    const config={
      withCredentials:true,
      headers:  
      {
        "Content-Type":"application/json"
      }
    };
   
   try{
    const { data }=await axios.post(`${server}/api/v1/login`,{
      username:username.value,
      password:password.value
    },config)
    disaptch(userExists((data.user)))
    toast.success( "Sucesfully Logined")
   }
   catch(error){
    toast.error(error?.response?.data?.message || "Login Failed");
   }
  }

  return (
    <Container component="main" maxWidth="xs"
    sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
            onSubmit={handlesubmitlogin}
            >
              <TextField
                required
                fullWidth
                label="username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                onClick={handlesubmitlogin}
              >
                Login
              </Button>
             
              <Typography sx={{ marginTop: "1rem", 
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}  >OR</Typography>
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                color="secondary"
                fullWidth
                type="submit"
                onClick={() => setLogin(false)}
              >
                Register
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Register</Typography>
            <form

            style={{
                width:"100%",
                marginTop:"1rem",
            }}

            onSubmit={handlesubmiteregister}
            >
            <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                sx={{
                   width:"10rem",
                   height:"10rem",
                   objectFit:"contain"
                }}
                src={avatra.preview}
                />
                {avatra.error &&<Typography 
                m={"1rem"}
                color="error" variant="caption">{avatra.error}</Typography>}

                <IconButton
                
                sx={{
                    position:"absolute",
                    bottom:"0",
                    right:"0",
                    bgcolor:"rgba(255,255,255,0.5)",
                    ":hover":{
                        bgcolor:"rgba(255,255,255,0.7)",
                    }
                    
                }}
                component="label"
                >
                    <>
                    <CameraAlt/>
                    <VisuallyHiddenInput type="text" onChange={avatra.changeHandler}/>
                 
                    </>
                </IconButton>

              </Stack>
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              {username.error && <Typography color="error" variant="caption">{username.error}</Typography>}
              <TextField
                required
                fullWidth
                label="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
               {password.error && <Typography color="error" variant="caption">{password.error}</Typography>}

            </form>
            <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                onClick={handlesubmiteregister}
              >
                Register
              </Button>
              <Typography sx={{ marginTop: "1rem", 
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}  >OR</Typography>
              
            <Button
              sx={{
                marginTop: "1rem",
              }}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => setLogin(true)}
            >
              Login
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
