import * as types from '../constants/ActionTypes'
import { AsyncStorage } from "react-native"



export const register = payload =>(dispatch,getState) =>{
   
    //Check if user already exist
    getUserFromEmail =  async ()=>{
      
        const user = await AsyncStorage.getItem(payload.email);
        return JSON.parse(user);
    }

    saveUser = async (user) =>{
        await AsyncStorage.setItem(user.email, JSON.stringify(user));
        return user;
    }
    getUserFromEmail().then(u=>{

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
   
}

export const login = payload =>(dispatch,getState) =>{
    //Check if user already exist
   getUserFromEmail =  async ()=>{
        const user = await AsyncStorage.getItem(payload.email);
        return JSON.parse(user);
    }

    getUserFromEmail().then(u=>{

        if(u != null){
           
            if(payload.password === u.password){

                dispatch({
                    type:types.LOGIN_SUCCESS,
                    token:u.email
                    })
            }else{

                dispatch({
                    type:types.LOGIN_FAIL,
                    message:"Email or Password is not valid"
                })
            }
        }else
        {
            throw {message: 'User does not exist'}
        }
    }).catch(error=>{

        dispatch({
            type:types.LOGIN_FAIL,
            message:error.message
        })
    })

}


export const getUser = payload =>(dispatch,getState) =>{
   

    //Check if user already exist
   fetchUser =  async ()=>{
        
        const email = await AsyncStorage.getItem('userToken');
        const user = await AsyncStorage.getItem(email);
        return JSON.parse(user);
    }

    fetchUser().then(user=>{
        dispatch({
            type:types.USER_UPDATED,
            user
        })
    }).catch(error=>{
        dispatch({
            type:types.REGISTRATION_FAIL,
            message:error.message
        })
    })
   
}
