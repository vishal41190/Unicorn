import * as types from '../constants/ActionTypes'
import { AsyncStorage } from "react-native"
const serverURL =  "http://256ec955.ngrok.io/1.0/api/"



export const register = payload =>(dispatch,getState) =>{
   
    //Check if user already exist
   getUser =  async ()=>{
      
        const user = await AsyncStorage.getItem(payload.email);
        return user;
    }

    saveUser = async (user) =>{
        await AsyncStorage.setItem(user.email, JSON.stringify(user));
        return user;
    }
    getUser().then(u=>{

        if(u == null){
            
            saveUser(payload).then(user=>{
                dispatch({
                type:types.REGISTRATION_SUCCESS,
                token:user.email
                })
            }).catch(error=>{
                dispatch({
                    type:types.REGISTRATION_FAIL,
                    message:error.message
                })
            })
        }else{
            throw {message: 'User already exist'}
        }
    }).catch(error=>{
        dispatch({
            type:types.REGISTRATION_FAIL,
            message:error.message
        })
    })
   


//    return  fetch(serverURL+'user/login',{
//        method:'post',
//        headers: {
//         'Accept': 'application/json', 
//         'Content-Type': 'application/json',
//       },
//        body:JSON.stringify(payload)
//    })
//    .then(response => response.json()) 
//    .then(response => { 
    
//     if(response.success){
//         return response.token;
//     }else{
//         throw {message:'Error fetching assets'}
//     }

//     })
//     .then(token  => {
//             dispatch({
//                 type:types.REGISTRATION_SUCCESS,
//                 token
//             })
//     }).catch(error =>{
//             dispatch({
//                 type:types.REGISTRATION_FAIL
//             })
//     });

}
