import {isValidUsername} from '6pp'

export const usernamevalidate=(username)=>{
    if(!isValidUsername(username))
    return {isValid:false,errorMessage:"username is Invalid"};
}