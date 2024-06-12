import { Dialog, DialogTitle, InputAdornment, List,Stack, TextField } from '@mui/material';
import { useInputValidation } from '6pp'; 
import { Search } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/miscs';
import { useLazySearchUserQuery, useSerachFirendRequesrMutation } from '../../redux/api/api';
import { useAsyncMutation } from '../../hooks/hook';

const SearchComponent = () => {

  const search = useInputValidation("");
  const { isSearch } = useSelector((state) => state.miscs); 
  
  const [searchUser]=useLazySearchUserQuery();
  const [serachFirendRequest,isLoadingSendFriendRequest]=useAsyncMutation(useSerachFirendRequesrMutation);
  const dispatch=useDispatch()
  const[users,setusers]=useState([])

  const addFrinedhandler = async(id) =>
  {
    await serachFirendRequest("Sending Friend Request...",{UserId:id})
    
  }  
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setusers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  const serachClose = () =>{
    dispatch(setIsSearch(false))
   }

  return (
    <Dialog open={isSearch} onClose={serachClose}>
      <Stack padding="2rem" direction="column" width="25rem">

        <DialogTitle textAlign="center">Find People</DialogTitle>
        
        <TextField 
          label="Search" 
          value={search.value} 
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
        
        <List>
          {users.map((i) => (
            <UserItem user={i} key={i._id}  handler={addFrinedhandler} handlersLoading={isLoadingSendFriendRequest}/>
          ))}
        </List>

      </Stack>
    </Dialog>
  );
}

export default SearchComponent;
